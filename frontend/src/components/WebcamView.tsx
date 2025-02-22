import React, { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Camera, Pause, Play, StopCircle } from "lucide-react";

interface WebcamViewProps {
  onFrame?: (imageData: ImageData) => void;
}

export const WebcamView: React.FC<WebcamViewProps> = ({ onFrame }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Add frame capture functionality
  const captureFrame = () => {
    if (videoRef.current && onFrame && isPlaying && !isAnalyzing) {
      console.log("Capturing frame...");
      setIsAnalyzing(true);
      
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        console.log("Frame captured, dimensions:", {
          width: imageData.width,
          height: imageData.height
        });
        
        onFrame(imageData);
        setTimeout(() => setIsAnalyzing(false), 2000); // Prevent too frequent captures
      }
    }
  };

  // Add interval for frame capture
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    if (isPlaying && onFrame) {
      console.log("Setting up frame capture interval");
      intervalId = setInterval(captureFrame, 3000); // Capture every 3 seconds
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isPlaying, onFrame]);

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsPlaying(true);
        setError("");
        console.log("Webcam started successfully");
      }
    } catch (err) {
      setError("Unable to access webcam. Please ensure you have granted permission.");
      console.error("Error accessing webcam:", err);
    }
  };

  const stopWebcam = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setIsPlaying(false);
      console.log("Webcam stopped");
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
        console.log("Video playback resumed");
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
        console.log("Video playback paused");
      }
    }
  };

  useEffect(() => {
    return () => {
      stopWebcam();
    };
  }, []);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative rounded-lg overflow-hidden bg-black/5 aspect-video">
        {error ? (
          <div className="absolute inset-0 flex items-center justify-center text-destructive">
            <p>{error}</p>
          </div>
        ) : null}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2">
        {!streamRef.current ? (
          <Button
            onClick={startWebcam}
            variant="secondary"
            className="bg-white/90 hover:bg-white/100 backdrop-blur-sm transition-all duration-200"
          >
            <Camera className="w-4 h-4 mr-2" />
            Start Camera
          </Button>
        ) : (
          <>
            <Button
              onClick={togglePlayPause}
              variant="secondary"
              className="bg-white/90 hover:bg-white/100 backdrop-blur-sm transition-all duration-200"
              size="icon"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
            </Button>
            <Button
              onClick={stopWebcam}
              variant="secondary"
              className="bg-white/90 hover:bg-white/100 backdrop-blur-sm transition-all duration-200"
              size="icon"
            >
              <StopCircle className="w-4 h-4" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};