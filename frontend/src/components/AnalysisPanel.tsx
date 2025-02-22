
import React from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface AnalysisPanelProps {
  loading?: boolean;
  analysis: {
    description?: string;
    objects?: string[];
    activity?: string;
  };
}

export const AnalysisPanel: React.FC<AnalysisPanelProps> = ({
  loading,
  analysis,
}) => {
  return (
    <Card className="w-full h-full max-h-[400px] backdrop-blur-sm bg-white/80 border-0 shadow-lg animate-fadeIn">
      <ScrollArea className="h-full p-6">
        <div className="space-y-6">
          <div>
            <Badge variant="secondary" className="mb-2">
              Scene Description
            </Badge>
            <p className="text-sm text-gray-600">
              {loading
                ? "Analyzing scene..."
                : analysis.description || "Start the camera to begin analysis"}
            </p>
          </div>

          <div>
            <Badge variant="secondary" className="mb-2">
              Detected Objects
            </Badge>
            <div className="flex flex-wrap gap-2">
              {loading ? (
                <Badge variant="outline">Analyzing...</Badge>
              ) : analysis.objects?.length ? (
                analysis.objects.map((object, index) => (
                  <Badge key={index} variant="outline">
                    {object}
                  </Badge>
                ))
              ) : (
                <Badge variant="outline">No objects detected</Badge>
              )}
            </div>
          </div>

          <div>
            <Badge variant="secondary" className="mb-2">
              Activity
            </Badge>
            <p className="text-sm text-gray-600">
              {loading
                ? "Analyzing activity..."
                : analysis.activity || "No activity detected"}
            </p>
          </div>
        </div>
      </ScrollArea>
    </Card>
  );
};
