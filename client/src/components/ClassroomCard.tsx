import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, BookOpen } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ClassroomCardProps {
  id: string;
  name: string;
  subject: string;
  studentsCount: number;
  onViewDetails: () => void;
}

export default function ClassroomCard({ id, name, subject, studentsCount, onViewDetails }: ClassroomCardProps) {
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <Card className="hover-elevate active-elevate-2 cursor-pointer" onClick={onViewDetails} data-testid={`card-classroom-${id}`}>
      <CardHeader className="flex flex-row items-center gap-4 pb-3">
        <Avatar className="h-12 w-12">
          <AvatarFallback className="bg-primary/10 text-primary font-semibold">{initials}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="font-semibold" data-testid={`text-classroom-name-${id}`}>{name}</h3>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
            <BookOpen className="h-3.5 w-3.5" />
            <span data-testid={`text-subject-${id}`}>{subject}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium" data-testid={`text-students-count-${id}`}>{studentsCount} students</span>
        </div>
        <Button size="sm" variant="ghost" data-testid={`button-view-${id}`}>
          View
        </Button>
      </CardContent>
    </Card>
  );
}
