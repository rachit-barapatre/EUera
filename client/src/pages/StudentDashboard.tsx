import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Brain, TrendingUp, Award } from "lucide-react";
import RadarChart from "@/components/RadarChart";
import ProgressLine from "@/components/ProgressLine";

export default function StudentDashboard() {
  const student = {
    name: "Alice Johnson",
    class: "Grade 10",
    subject: "Mathematics",
    avatarUrl: "",
  };

  const cognitiveProfile = [
    { label: "Attention", value: 82 },
    { label: "Engagement", value: 78 },
    { label: "Memory", value: 85 },
    { label: "Processing", value: 72 },
    { label: "Focus", value: 88 },
  ];

  const weeklyTrend = [
    { label: "Mon", value: 72 },
    { label: "Tue", value: 78 },
    { label: "Wed", value: 75 },
    { label: "Thu", value: 82 },
    { label: "Fri", value: 88 },
    { label: "Sat", value: 85 },
    { label: "Sun", value: 90 },
  ];

  const initials = student.name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 z-50">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold" data-testid="text-page-title">Student Dashboard</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-6">
        <Card className="hover-elevate">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={student.avatarUrl} alt={student.name} />
                <AvatarFallback className="bg-primary/10 text-primary text-2xl">{initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-3">
                <div>
                  <h2 className="text-2xl font-bold" data-testid="text-student-name">{student.name}</h2>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="outline" data-testid="badge-class">{student.class}</Badge>
                    <Badge variant="outline" data-testid="badge-subject">{student.subject}</Badge>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 pt-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Score</p>
                    <p className="text-2xl font-bold" data-testid="text-avg-score">82%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Assessments</p>
                    <p className="text-2xl font-bold" data-testid="text-assessments">12</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Rank</p>
                    <p className="text-2xl font-bold" data-testid="text-rank">#5</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" data-testid="button-view-details">View Details</Button>
                <Button data-testid="button-download-report">
                  <Download className="h-4 w-4 mr-2" />
                  Download Report
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
              <h3 className="text-sm font-medium text-muted-foreground">Cognitive Index</h3>
              <Brain className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="text-cognitive-index">82</div>
              <p className="text-xs text-success">↑ 5% from last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
              <h3 className="text-sm font-medium text-muted-foreground">Performance Trend</h3>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="text-performance">Improving</div>
              <p className="text-xs text-muted-foreground">Last 7 days</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
              <h3 className="text-sm font-medium text-muted-foreground">Achievements</h3>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="text-achievements">8</div>
              <p className="text-xs text-muted-foreground">Badges earned</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <h3 className="font-semibold">Cognitive Profile</h3>
            </CardHeader>
            <CardContent>
              <RadarChart data={cognitiveProfile} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="font-semibold">Weekly Performance Trend</h3>
            </CardHeader>
            <CardContent>
              <ProgressLine data={weeklyTrend} />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <h3 className="font-semibold">Recent Assessments</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: "Math Quiz - Chapter 5", date: "2 days ago", score: 88 },
                { name: "Physics Test - Unit 3", date: "1 week ago", score: 92 },
                { name: "Chemistry Lab Report", date: "2 weeks ago", score: 85 },
              ].map((assessment, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-md border border-border hover-elevate"
                  data-testid={`assessment-${i}`}
                >
                  <div>
                    <p className="font-medium">{assessment.name}</p>
                    <p className="text-sm text-muted-foreground">{assessment.date}</p>
                  </div>
                  <Badge variant="outline" className="text-base font-semibold">
                    {assessment.score}%
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
