import RadarChart from '../RadarChart';
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function RadarChartExample() {
  const cognitiveData = [
    { label: "Attention", value: 78 },
    { label: "Engagement", value: 85 },
    { label: "Memory", value: 72 },
    { label: "Processing", value: 68 },
    { label: "Focus", value: 82 },
  ];

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <h3 className="font-semibold">Cognitive Profile</h3>
        </CardHeader>
        <CardContent>
          <RadarChart data={cognitiveData} />
        </CardContent>
      </Card>
    </div>
  );
}
