import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDistanceToNow } from 'date-fns';

interface AnalysisResult {
  timestamp: string;
  driver_state: string | null;
  road_conditions: string | null;
  combined_context: string;
  frame_ids: Record<string, string>;
}

interface AnalysisPanelProps {
  loading?: boolean;
  currentAnalysis?: AnalysisResult;
}

export const AnalysisPanel: React.FC<AnalysisPanelProps> = ({
  loading = false,
  currentAnalysis
}) => {
  const [history, setHistory] = useState<AnalysisResult[]>([]);
  const [activeTab, setActiveTab] = useState("live");

  // Add to history when new analysis comes in
  React.useEffect(() => {
    if (currentAnalysis) {
      setHistory(prev => [currentAnalysis, ...prev].slice(0, 10)); // Keep last 10 analyses
    }
  }, [currentAnalysis]);

  const renderAnalysis = (analysis: AnalysisResult) => (
    <div className="space-y-4">
      <div>
        <h3 className="font-medium mb-2">Driver Status</h3>
        <p className="text-sm text-gray-600">
          {analysis.driver_state || "No driver analysis available"}
        </p>
      </div>

      <div>
        <h3 className="font-medium mb-2">Road Conditions</h3>
        <p className="text-sm text-gray-600">
          {analysis.road_conditions || "No road analysis available"}
        </p>
      </div>

      <div>
        <h3 className="font-medium mb-2">Combined Analysis</h3>
        <p className="text-sm text-gray-600">
          {analysis.combined_context || "No combined analysis available"}
        </p>
      </div>

      <div className="text-xs text-gray-400">
        UTC: {new Date(analysis.timestamp).toISOString().replace('T', ' ').split('.')[0]}
      </div>
    </div>
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Analysis Results</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="live">Live Analysis</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="live">
            {loading ? (
              <div className="text-center py-4 text-gray-500">
                Analyzing frame...
              </div>
            ) : currentAnalysis ? (
              renderAnalysis(currentAnalysis)
            ) : (
              <div className="text-center py-4 text-gray-500">
                No analysis available. Start the camera to begin.
              </div>
            )}
          </TabsContent>

          <TabsContent value="history">
            <ScrollArea className="h-[500px] pr-4">
              {history.length > 0 ? (
                <div className="space-y-8">
                  {history.map((analysis, index) => (
                    <div 
                      key={analysis.timestamp + index}
                      className={index !== 0 ? "pt-4 border-t" : ""}
                    >
                      {renderAnalysis(analysis)}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-gray-500">
                  No historical data available yet.
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AnalysisPanel;