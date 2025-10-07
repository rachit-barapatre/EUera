import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RefreshCw } from "lucide-react";
import HeatmapCell from "@/components/HeatmapCell";
import StudentDrawer from "@/components/StudentDrawer";
import { useLocation } from "wouter";
import { Badge } from "@/components/ui/badge";

export default function LiveHeatmap() {
  const [, setLocation] = useLocation();
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const students = [
    {
      studentId: "stu-001",
      name: "Alice Johnson",
      cognitiveState: "green" as const,
      metrics: { attention: 0.85, engagement: 0.78, stress: 0.22 },
    },
    {
      studentId: "stu-002",
      name: "Bob Smith",
      cognitiveState: "yellow" as const,
      metrics: { attention: 0.62, engagement: 0.58, stress: 0.48 },
    },
    {
      studentId: "stu-003",
      name: "Carol Davis",
      cognitiveState: "red" as const,
      metrics: { attention: 0.38, engagement: 0.42, stress: 0.82 },
    },
    {
      studentId: "stu-004",
      name: "David Lee",
      cognitiveState: "green" as const,
      metrics: { attention: 0.91, engagement: 0.88, stress: 0.18 },
    },
    {
      studentId: "stu-005",
      name: "Emma Wilson",
      cognitiveState: "green" as const,
      metrics: { attention: 0.88, engagement: 0.82, stress: 0.25 },
    },
    {
      studentId: "stu-006",
      name: "Frank Moore",
      cognitiveState: "yellow" as const,
      metrics: { attention: 0.68, engagement: 0.65, stress: 0.52 },
    },
    {
      studentId: "stu-007",
      name: "Grace Taylor",
      cognitiveState: "green" as const,
      metrics: { attention: 0.82, engagement: 0.79, stress: 0.28 },
    },
    {
      studentId: "stu-008",
      name: "Henry Brown",
      cognitiveState: "yellow" as const,
      metrics: { attention: 0.58, engagement: 0.62, stress: 0.55 },
    },
  ];

  const handleStudentClick = (student: any) => {
    setSelectedStudent({
      id: student.studentId,
      name: student.name,
      cognitiveState: student.cognitiveState,
      metrics: student.metrics,
    });
    setIsDrawerOpen(true);
  };

  const greenCount = students.filter((s) => s.cognitiveState === "green").length;
  const yellowCount = students.filter((s) => s.cognitiveState === "yellow").length;
  const redCount = students.filter((s) => s.cognitiveState === "red").length;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => setLocation('/teacher')} data-testid="button-back">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold" data-testid="text-page-title">Live Cognitive Heatmap</h1>
                <p className="text-sm text-muted-foreground">Advanced Mathematics - Unit 5</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Badge className="bg-success text-white">{greenCount} Optimal</Badge>
                <Badge className="bg-warning text-white">{yellowCount} Moderate</Badge>
                <Badge className="bg-error text-white">{redCount} High Stress</Badge>
              </div>
              <Button variant="outline" size="icon" data-testid="button-refresh">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {students.map((student) => (
            <HeatmapCell
              key={student.studentId}
              {...student}
              onClick={() => handleStudentClick(student)}
            />
          ))}
        </div>
      </main>

      {selectedStudent && (
        <StudentDrawer
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          student={selectedStudent}
        />
      )}
    </div>
  );
}
