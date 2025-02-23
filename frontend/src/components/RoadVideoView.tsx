import React, { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Pause, Play, StopCircle, Upload } from "lucide-react";
import { API_ENDPOINTS } from '@/config/config';  // Add this at the top with other imports

interface RoadVideoViewProps {
  onFrame?: (analysis: AnalysisResult) => void;
}

interface AnalysisResult {
  timestamp: string;
  driver_state: string | null;
  road_conditions: string | null;
  combined_context: string;
  frame_ids: Record<string, string>;
}

export const RoadVideoView: React.FC<RoadVideoViewProps> = ({ onFrame }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string>("");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
      if (videoRef.current) {
        videoRef.current.src = url;
        videoRef.current.load();
      }
    }
  };

  const captureFrame = async () => {
    if (videoRef.current && onFrame && isPlaying && !isAnalyzing && videoUrl) {
      setIsAnalyzing(true);
      
      try {
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(videoRef.current, 0, 0);
          const base64Image = canvas.toDataURL('image/jpeg').split(',')[1];
          
          const response = await fetch(API_ENDPOINTS.frames, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              frame_data: base64Image,
              camera_type: 'road',
              timestamp: new Date().toISOString()
            })
          });

          if (!response.ok) {
            throw new Error('Failed to analyze frame');
          }

          const analysis = await response.json();
          onFrame(analysis);
        }
        setError("");
      } catch (err) {
        console.error('Error sending frame to backend:', err);
        setError('Failed to analyze frame. Will retry.');
      } finally {
        setIsAnalyzing(false);
      }
    }
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    if (isPlaying && onFrame && videoUrl) {
      console.log("Setting up frame capture interval for road video");
      intervalId = setInterval(captureFrame, 3000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isPlaying, onFrame, videoUrl]);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const stopVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    // Clean up object URL on unmount
    return () => {
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
      }
    };
  }, [videoUrl]);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative rounded-lg overflow-hidden bg-black/5 aspect-video">
        {error ?  null : null}
        <video
          ref={videoRef}
          playsInline
          loop
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2">
        {!videoUrl ? (
          <>
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              className="hidden"
              onChange={handleFileUpload}
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="secondary"
              className="bg-white/90 hover:bg-white/100 backdrop-blur-sm transition-all duration-200"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Road Video
            </Button>
          </>
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
              onClick={stopVideo}
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