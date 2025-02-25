# Road-Mate: AI-Powered Drowsy Driving Prevention System

This application helps prevent drowsy driving by providing real-time analysis of driver behavior through voice and video streams. The system uses Google's Gemini AI to monitor driver alertness and provides interactive conversation to keep drivers engaged and safe. The project consists of a React frontend, FastAPI backend, and mobile applications.

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
GOOGLE_AI_API_KEY=your_key_here
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
pip install fastapi uvicorn python-multipart python-jose pydantic python-dotenv google-generativeai
```

4. Create a `.env` file in the backend directory:
```env
GOOGLE_AI_API_KEY=your_key_here
```

5. Start the FastAPI server:
```bash
uvicorn main:app --reload
```

The backend API will be available at `http://localhost:8000`

### Mobile Setup (Expo)

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
EXPO_ELEVENLABS_API_KEY=your_key_here
EXPO_ELEVENLABS_AGENT_ID=your_agent_id_here
```

4. Start the development server:
```bash
npx expo start
```

### Vercel Mobile Setup

1. Navigate to the vercel-mobile directory:
```bash
cd vercel-mobile
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the vercel-mobile directory with your API keys:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key_here
CLERK_SECRET_KEY=your_key_here
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
GOOGLE_AI_API_KEY=your_key_here
REPLICATE_API_KEY=your_key_here
```

4. Start the development server:
```bash
npm run dev
```

The vercel-mobile app will be available at `http://localhost:3000`

## Environment Setup

### Required Environment Variables

You'll need to obtain API keys from the following services:

1. **Google AI (Gemini)** (https://ai.google.dev/)
   - Used for vision analysis and driver monitoring
   - Required for: Frontend, Backend, Vercel Mobile

2. **Clerk** (https://clerk.com)
   - Used for authentication
   - Required for: Mobile (Expo), Vercel Mobile

3. **ElevenLabs** (https://elevenlabs.io)
   - Used for voice synthesis
   - Required for: Mobile (Expo)

4. **Replicate** (https://replicate.com)
   - Used for AI models
   - Required for: Vercel Mobile

Frontend (.env):
```env
GOOGLE_AI_API_KEY=your_key_here
```

Backend (.env):
```env
GOOGLE_AI_API_KEY=your_key_here
```

Mobile (Expo) (.env):
```env
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key_here
EXPO_ELEVENLABS_API_KEY=your_key_here
EXPO_ELEVENLABS_AGENT_ID=your_agent_id_here
```

Vercel Mobile (.env):
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key_here
CLERK_SECRET_KEY=your_key_here
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
GOOGLE_AI_API_KEY=your_key_here
REPLICATE_API_KEY=your_key_here
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
- Google Gemini Vision API integration
- Real-time voice and video analysis

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
- Voice interaction keeps drivers engaged
- Real-time drowsiness detection and alerts

For more detailed documentation, check the individual README files in the frontend and backend directories.