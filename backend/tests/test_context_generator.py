import asyncio
import base64
import httpx
from datetime import datetime
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configuration
BASE_URL = "http://localhost:8000"

async def encode_image(image_path: str) -> str:
    """Convert image to base64"""
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')

async def test_frame_submission(client: httpx.AsyncClient, image_path: str, camera_type: str):
    """Test submitting a frame"""
    print(f"\nTesting frame submission for {camera_type} camera...")
    
    try:
        # Encode image
        base64_image = await encode_image(image_path)
        
        # Submit frame
        response = await client.post(
            f"{BASE_URL}/frames/",
            json={
                "frame_data": base64_image,
                "camera_type": camera_type,
                "timestamp": datetime.utcnow().isoformat()
            }
        )
        
        print(f"Status Code: {response.status_code}")
        print("Response:", response.json())
        return response.json()
    
    except Exception as e:
        print(f"Error submitting frame: {str(e)}")
        return None

async def test_context_retrieval(client: httpx.AsyncClient):
    """Test retrieving latest context"""
    print("\nTesting context retrieval...")
    
    try:
        response = await client.get(f"{BASE_URL}/context/latest")
        print(f"Status Code: {response.status_code}")
        print("Latest Context:", response.json())
    except Exception as e:
        print(f"Error retrieving context: {str(e)}")

async def main():
    """Main test function"""
    print("Starting Context Generator Tests...")
    
    # Test image paths - you'll need to update these
    driver_image = "test_images/driver.jpg"
    road_image = "test_images/road.jpg"
    
    async with httpx.AsyncClient() as client:
        # Test health endpoint
        try:
            response = await client.get(f"{BASE_URL}/health")
            print("\nHealth Check Status:", response.status_code)
        except Exception as e:
            print(f"Error checking health: {str(e)}")
            return
        
        # Test driver camera
        await test_frame_submission(client, driver_image, "driver")
        
        # Test road camera
        await test_frame_submission(client, road_image, "road")
        
        # Test context retrieval
        await test_context_retrieval(client)

if __name__ == "__main__":
    asyncio.run(main())