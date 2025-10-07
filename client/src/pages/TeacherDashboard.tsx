import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Users, Brain, FileCheck, Bell, Plus, Search } from "lucide-react";
import StatsCard from "@/components/StatsCard";
import ClassroomCard from "@/components/ClassroomCard";
import { useLocation } from "wouter";
import { Badge } from "@/components/ui/badge";

export default function TeacherDashboard() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const classrooms = [
    { id: "cls-001", name: "Advanced Mathematics", subject: "Mathematics", studentsCount: 28 },
    { id: "cls-002", name: "Physics Fundamentals", subject: "Physics", studentsCount: 32 },
    { id: "cls-003", name: "English Literature", subject: "English", studentsCount: 25 },
    { id: "cls-004", name: "Chemistry Lab", subject: "Chemistry", studentsCount: 24 },
  ];

  const filteredClassrooms = classrooms.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold" data-testid="text-welcome">Welcome back, Dr. Sarah</h1>
              <p className="text-sm text-muted-foreground">Here's what's happening with your classes today</p>
            </div>
            <div className="flex items-center gap-3">
              <Button size="icon" variant="ghost" className="relative" data-testid="button-notifications">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">3</Badge>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatsCard title="Total Students" value={109} delta={8} icon={Users} />
          <StatsCard title="Avg Cognitive Score" value={78} delta={5} icon={Brain} suffix="%" />
          <StatsCard title="Assessments" value={24} delta={-2} icon={FileCheck} />
        </div>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h2 className="text-xl font-semibold">Classrooms & Subjects</h2>
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search classrooms..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                  data-testid="input-search-classrooms"
                />
              </div>
              <Button data-testid="button-create-assessment">
                <Plus className="h-4 w-4 mr-2" />
                Create Assessment
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredClassrooms.map((classroom) => (
              <ClassroomCard
                key={classroom.id}
                {...classroom}
                onViewDetails={() => setLocation(`/classroom/${classroom.id}`)}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
