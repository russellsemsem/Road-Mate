from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional
import base64
from datetime import datetime

app = FastAPI()

class Frame(BaseModel):
    """Frame data model for incoming video frames"""
    frame_data: str  # Base64 encoded image data
    camera_type: str  # 'driver' or 'road'
    timestamp: Optional[datetime] = None
    metadata: Optional[dict] = None

class FrameResponse(BaseModel):
    """Response model for frame ingestion"""
    success: bool
    frame_id: str
    timestamp: datetime
    message: Optional[str] = None

@app.post("/frames/", response_model=FrameResponse)
async def ingest_frame(frame: Frame):
    try:
        # Validate frame data is proper base64
        try:
            base64.b64decode(frame.frame_data)
        except Exception as e:
            raise HTTPException(status_code=400, detail="Invalid base64 frame data")
            
        # Validate camera type
        if frame.camera_type not in ['driver', 'road']:
            raise HTTPException(status_code=400, detail="Invalid camera type")
            
        # Set timestamp if not provided
        if not frame.timestamp:
            frame.timestamp = datetime.utcnow()
            
        # Generate unique frame ID (you might want to use UUID or another method)
        frame_id = f"{frame.camera_type}_{frame.timestamp.timestamp()}"
            
        return FrameResponse(
            success=True,
            frame_id=frame_id,
            timestamp=frame.timestamp,
            message="Frame ingested successfully"
        )
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "healthy"}