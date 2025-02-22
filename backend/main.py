from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional, List, Dict
from datetime import datetime
import httpx
import base64
from collections import deque
import json
import os
from enum import Enum
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configuration from environment
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
if not GOOGLE_API_KEY:
    raise ValueError("GOOGLE_API_KEY must be set in environment variables")
    
CONTEXT_HISTORY_SIZE = int(os.getenv("CONTEXT_HISTORY_SIZE", "5"))
DEBUG = os.getenv("DEBUG", "False").lower() == "true"

class CameraType(str, Enum):
    DRIVER = "driver"
    ROAD = "road"

class Frame(BaseModel):
    frame_data: str  # Base64 encoded image data
    camera_type: CameraType
    timestamp: Optional[datetime] = None
    metadata: Optional[dict] = None

class Context(BaseModel):
    timestamp: datetime
    driver_state: Optional[str]
    road_conditions: Optional[str]
    combined_context: str
    frame_ids: Dict[str, str]  # Maps camera_type to frame_id

class ContextGenerator:
    def __init__(self, api_key: str, context_history_size: int = 5):
        self.api_key = api_key
        self.contexts = deque(maxlen=context_history_size)
        self.latest_frames = {}
        
    async def analyze_frame(self, frame_data: str, camera_type: CameraType) -> dict:
        """Analyze a single frame using Gemini API"""
        prompt = (
            "In 1-2 sentences, describe the driver's alertness level, sleep levels and any concerning behaviors. Focus only on key observations."
            if camera_type == CameraType.DRIVER else
            "In 2-3 sentences, summarize the key road conditions and any immediate hazards that need attention."
        )
        
        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
                    headers={
                        'Content-Type': 'application/json',
                        'x-goog-api-key': self.api_key,
                    },
                    json={
                        "contents": {
                            "role": "user",
                            "parts": [
                                {"text": prompt},
                                {
                                    "inline_data": {
                                        "mime_type": "image/jpeg",
                                        "data": frame_data
                                    }
                                }
                            ]
                        },
                        "generationConfig": {
                            "temperature": 0.4,
                            "topK": 32,
                            "topP": 1,
                            "maxOutputTokens": 1024,
                        },
                    }
                )
                
                if response.status_code != 200:
                    raise HTTPException(status_code=500, detail=f"Gemini API error: {response.text}")
                
                result = response.json()
                return {
                    "analysis": result["candidates"][0]["content"]["parts"][0]["text"],
                    "timestamp": datetime.utcnow()
                }
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Frame analysis failed: {str(e)}")

    def combine_contexts(self, driver_analysis: Optional[dict], road_analysis: Optional[dict]) -> str:
        """Combine driver and road analyses into a single context"""
        context_parts = []
        
        if driver_analysis:
            context_parts.append(driver_analysis["analysis"])
        if road_analysis:
            context_parts.append(road_analysis["analysis"])
            
        if not context_parts:
            return "No context available"
            
        return " ".join(context_parts)

    async def process_frame(self, frame: Frame) -> Context:
        """Process a new frame and update context"""
        frame_id = f"{frame.camera_type}_{datetime.utcnow().timestamp()}"
        
        # Store the frame analysis
        analysis = await self.analyze_frame(frame.frame_data, frame.camera_type)
        self.latest_frames[frame.camera_type] = {
            "analysis": analysis,
            "frame_id": frame_id
        }
        
        # Generate combined context
        driver_analysis = self.latest_frames.get(CameraType.DRIVER, {}).get("analysis")
        road_analysis = self.latest_frames.get(CameraType.ROAD, {}).get("analysis")
        
        context = Context(
            timestamp=datetime.utcnow(),
            driver_state=driver_analysis["analysis"] if driver_analysis else None,
            road_conditions=road_analysis["analysis"] if road_analysis else None,
            combined_context=self.combine_contexts(driver_analysis, road_analysis),
            frame_ids={
                camera_type: data["frame_id"]
                for camera_type, data in self.latest_frames.items()
            }
        )
        
        self.contexts.append(context)
        return context

    def get_latest_context(self) -> Optional[Context]:
        """Get the most recent context"""
        return self.contexts[-1] if self.contexts else None

    def get_context_history(self) -> List[Context]:
        """Get all stored contexts"""
        return list(self.contexts)

# Initialize FastAPI app
app = FastAPI()

# Initialize context generator
context_generator = ContextGenerator(
    api_key=GOOGLE_API_KEY,
    context_history_size=CONTEXT_HISTORY_SIZE
)

@app.post("/frames/", response_model=Context)
async def process_frame(frame: Frame):
    return await context_generator.process_frame(frame)

@app.get("/context/latest", response_model=Optional[Context])
async def get_latest_context():
    return context_generator.get_latest_context()

@app.get("/context/history", response_model=List[Context])
async def get_context_history():
    return context_generator.get_context_history()

@app.get("/health")
async def health_check():
    return {"status": "healthy"}