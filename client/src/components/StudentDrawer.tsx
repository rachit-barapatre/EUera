import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CognitiveState } from "@shared/schema";
import ProgressLine from "./ProgressLine";
import RadarChart from "./RadarChart";
import { Download, AlertTriangle } from "lucide-react";

interface StudentDrawerProps {
  open: boolean;
  onClose: () => void;
  student: {
    id: string;
    name: string;
    avatarUrl?: string;
    cognitiveState: CognitiveState;
    metrics: {
      attention: number;
      engagement: number;
      stress: number;
    };
  };
}

const stateLabels = {
  green: { text: "Optimal", color: "bg-success text-white" },
  yellow: { text: "Moderate Load", color: "bg-warning text-white" },
  red: { text: "High Stress", color: "bg-error text-white" },
};

export default function StudentDrawer({ open, onClose, student }: StudentDrawerProps) {
  const initials = student.name.split(' ').map(n => n[0]).join('').toUpperCase();

  const historicalData = [
    { label: "9 AM", value: 75 },
    { label: "10 AM", value: 82 },
    { label: "11 AM", value: 78 },
    { label: "12 PM", value: 68 },
    { label: "1 PM", value: 72 },
    { label: "2 PM", value: (student.metrics.attention + student.metrics.engagement) * 50 },
  ];

  const radarData = [
    { label: "Attention", value: student.metrics.attention * 100 },
    { label: "Engagement", value: student.metrics.engagement * 100 },
    { label: "Stress Management", value: (1 - student.metrics.stress) * 100 },
    { label: "Focus", value: student.metrics.attention * 90 },
    { label: "Retention", value: student.metrics.engagement * 85 },
  ];

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto" data-testid="drawer-student">
        <SheetHeader className="pb-4">
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={student.avatarUrl} alt={student.name} />
              <AvatarFallback className="bg-primary/10 text-primary text-lg">{initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <SheetTitle data-testid="text-student-name">{student.name}</SheetTitle>
              <Badge className={`mt-2 ${stateLabels[student.cognitiveState].color}`} data-testid="badge-cognitive-state">
                {stateLabels[student.cognitiveState].text}
              </Badge>
            </div>
          </div>
        </SheetHeader>

        <div className="space-y-6 py-4">
          <div>
            <h3 className="font-semibold mb-3">Real-time Metrics</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Attention</p>
                <p className="text-2xl font-bold" data-testid="text-attention">{(student.metrics.attention * 100).toFixed(0)}%</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Engagement</p>
                <p className="text-2xl font-bold" data-testid="text-engagement">{(student.metrics.engagement * 100).toFixed(0)}%</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Stress</p>
                <p className="text-2xl font-bold" data-testid="text-stress">{(student.metrics.stress * 100).toFixed(0)}%</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Today's Trend</h3>
            <ProgressLine data={historicalData} />
          </div>

          <div>
            <h3 className="font-semibold mb-3">Cognitive Profile</h3>
            <RadarChart data={radarData} />
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Assessment History</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-card rounded-md border border-card-border">
                <div>
                  <p className="font-medium text-sm">Math Quiz - Chapter 5</p>
                  <p className="text-xs text-muted-foreground">2 days ago</p>
                </div>
                <Badge variant="outline">85%</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-card rounded-md border border-card-border">
                <div>
                  <p className="font-medium text-sm">Physics Test - Unit 3</p>
                  <p className="text-xs text-muted-foreground">1 week ago</p>
                </div>
                <Badge variant="outline">92%</Badge>
              </div>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            {student.cognitiveState === "red" && (
              <Button variant="destructive" className="flex-1" data-testid="button-alert">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Send Alert
              </Button>
            )}
            <Button variant="outline" className="flex-1" data-testid="button-download">
              <Download className="h-4 w-4 mr-2" />
              Download Report
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
