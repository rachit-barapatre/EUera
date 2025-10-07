import ProgressLine from '../ProgressLine';
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function ProgressLineExample() {
  const weeklyData = [
    { label: "Mon", value: 65 },
    { label: "Tue", value: 72 },
    { label: "Wed", value: 68 },
    { label: "Thu", value: 78 },
    { label: "Fri", value: 82 },
    { label: "Sat", value: 75 },
    { label: "Sun", value: 88 },
  ];

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <h3 className="font-semibold">Weekly Cognitive Trend</h3>
        </CardHeader>
        <CardContent>
          <ProgressLine data={weeklyData} />
        </CardContent>
      </Card>
    </div>
  );
}
