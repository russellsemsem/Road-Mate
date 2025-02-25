# Road-Mate Backend Service

The backend service handles real-time video and audio processing for drowsy driver detection using Google's Gemini AI.

## Core Features

- **Real-time Video Analysis**: Processes webcam feeds to detect signs of drowsiness
  - Eye closure detection
  - Head position monitoring
  - Facial expression analysis

- **Voice Interaction Processing**: 
  - Analyzes driver's voice patterns
  - Detects signs of fatigue in speech
  - Maintains conversation context

- **Alert System**:
  - Triggers alerts based on drowsiness detection
  - Coordinates with mobile apps for notification delivery
  - Manages alert frequency and urgency levels

## Technical Implementation

- Built with FastAPI for high-performance async operations
- Uses Google Gemini AI for vision and voice analysis
- Implements WebSocket connections for real-time communication
- Includes test suite for core detection algorithms

## API Endpoints

- `/analyze/video`: Processes video frames for drowsiness detection
- `/analyze/voice`: Analyzes voice patterns for fatigue indicators
- `/ws/connect`: WebSocket endpoint for real-time communication

## Testing

Test files are located in the `/tests` directory:
- `test_context_generator.py`: Tests for conversation context management
- Test images in `/tests/test_images/` for vision analysis validation