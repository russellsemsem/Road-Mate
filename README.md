# Road-Mate: Real-Time Webcam Analysis Application

This application provides real-time analysis of webcam feeds using AI vision models. The project consists of a React frontend and FastAPI backend.

## Project Setup

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory with your API keys:
```env
OPENAI_API_KEY=your_key_here
```

4. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a new Conda environment:
```bash
conda create -n road-mate python=3.9
conda activate road-mate
```

3. Install required packages:
```bash
pip install fastapi uvicorn python-multipart python-jose pydantic python-dotenv
```

4. Create a `.env` file in the backend directory:
```env
OPENAI_API_KEY=your_key_here
```

5. Start the FastAPI server:
```bash
uvicorn main:app --reload
```

The backend API will be available at `http://localhost:8000`

### Mobile Setup

1. Navigate to the mobile directory:
```bash
cd mobile
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the mobile directory with your API keys:
```env
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key_here
```

4. Start the development server:
```bash
npx expo start
```

## Environment Setup

### Required Environment Variables

Frontend (.env):
```env
OPENAI_API_KEY=your_key_here
```

Backend (.env):
```env
OPENAI_API_KEY=your_key_here
```

Mobile (.env):
```env
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key_here
```

## Development

### Frontend Development
- The frontend is built with Next.js and React
- Uses Tailwind CSS for styling
- Components from shadcn/ui library
- WebRTC for webcam access

### Backend Development
- FastAPI framework
- Async support for real-time processing
- OpenAI Vision API integration

### Mobile Development
- Built with React Native and Expo
- Uses Clerk for authentication
- File-based routing with expo-router
- Secure token storage with expo-secure-store

## Troubleshooting

Common issues and solutions:

1. Webcam Access Denied
   - Ensure browser permissions are granted for camera access
   - Check if another application is using the webcam

2. Backend Connection Issues
   - Verify the backend server is running
   - Check CORS settings if making frontend changes

3. API Key Issues
   - Ensure environment variables are properly set
   - Verify API key permissions and quota

## Additional Notes

- The application processes webcam frames at regular intervals
- Analysis results update in real-time
- Multiple AI providers can be configured

For more detailed documentation, check the individual README files in the frontend and backend directories.Road-Mate
