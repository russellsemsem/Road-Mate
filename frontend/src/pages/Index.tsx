import React, { useState } from "react";
import { WebcamView } from "@/components/WebcamView";
import { RoadVideoView } from "@/components/RoadVideoView";
import { AnalysisPanel } from "@/components/AnalysisPanel";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AnalysisResult {
  timestamp: string;
  driver_state: string | null;
  road_conditions: string | null;
  combined_context: string;
  frame_ids: Record<string, string>;
}

const Index = () => {
  const [selectedProvider, setSelectedProvider] = useState<string>("gemini");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState({
    description: undefined,
    objects: [],
    activity: undefined,
  });

  const [currentAnalysis, setCurrentAnalysis] = useState<AnalysisResult | undefined>(undefined);

  const handleAnalysis = (analysisResult: AnalysisResult) => {
    setIsAnalyzing(false);
    setCurrentAnalysis(analysisResult);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold text-gray-900">Real-Time Analysis</h1>
          <Select
            value={selectedProvider}
            onValueChange={setSelectedProvider}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select AI Provider" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="openai">OpenAI Vision</SelectItem>
              <SelectItem value="gemini">Google Vision AI</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* First column: Video streams */}
          <div className="space-y-6">
            <WebcamView onFrame={handleAnalysis} />
            <RoadVideoView onFrame={handleAnalysis} />
          </div>
          
          {/* Second column: Analysis */}
          <AnalysisPanel 
            loading={isAnalyzing} 
            currentAnalysis={currentAnalysis}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;