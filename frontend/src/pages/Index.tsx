
import React, { useState } from "react";
import { WebcamView } from "@/components/WebcamView";
import { AnalysisPanel } from "@/components/AnalysisPanel";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Index = () => {
  const [selectedProvider, setSelectedProvider] = useState<string>("openai");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState({
    description: undefined,
    objects: [],
    activity: undefined,
  });

  const analyzeFrame = async (imageData: ImageData) => {
    const canvas = document.createElement('canvas');
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    const ctx = canvas.getContext('2d');
    ctx?.putImageData(imageData, 0, 0);
    
    // Convert the canvas to a base64 string
    const base64Image = canvas.toDataURL('image/jpeg');

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: "Analyze this image and provide: 1) A brief scene description 2) List of detected objects 3) Any ongoing activity. Format as JSON with keys: description, objects (array), activity",
                },
                {
                  type: "image_url",
                  image_url: {
                    url: base64Image
                  }
                }
              ]
            }
          ],
          max_tokens: 500
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze image');
      }

      const data = await response.json();
      try {
        const parsedContent = JSON.parse(data.choices[0].message.content);
        setAnalysis({
          description: parsedContent.description,
          objects: parsedContent.objects,
          activity: parsedContent.activity,
        });
      } catch (e) {
        console.error('Error parsing OpenAI response:', e);
        // If parsing fails, try to use the raw response in a more forgiving way
        const content = data.choices[0].message.content;
        setAnalysis({
          description: content,
          objects: [],
          activity: undefined,
        });
      }
    } catch (error) {
      console.error('Error analyzing frame:', error);
      setAnalysis({
        description: "Error analyzing frame",
        objects: [],
        activity: undefined,
      });
    } finally {
      setIsAnalyzing(false);
    }
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
              <SelectItem value="google">Google Vision AI</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <WebcamView onFrame={analyzeFrame} />
          <AnalysisPanel loading={isAnalyzing} analysis={analysis} />
        </div>
      </div>
    </div>
  );
};

export default Index;
