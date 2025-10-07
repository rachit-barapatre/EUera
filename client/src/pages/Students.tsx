import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, UserPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertStudentSchema, type Student, type InsertStudent } from "@shared/schema";
import { z } from "zod";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import StudentDrawer from "@/components/StudentDrawer";

const multiStudentSchema = z.object({
  students: z.array(insertStudentSchema).min(1, "At least one student is required"),
});

type MultiStudentForm = z.infer<typeof multiStudentSchema>;

export default function Students() {
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [studentForms, setStudentForms] = useState<InsertStudent[]>([
    { name: "", email: "", grade: "", classroomId: null, avatarUrl: null },
  ]);

  const { data: students = [], isLoading } = useQuery<Student[]>({
    queryKey: ["/api/students"],
  });

  const form = useForm<MultiStudentForm>({
    resolver: zodResolver(multiStudentSchema),
    defaultValues: {
      students: studentForms,
    },
  });

  const addStudentMutation = useMutation({
    mutationFn: async (data: MultiStudentForm) => {
      const response = await fetch("/api/students/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data.students),
      });
      
      if (!response.ok) throw new Error("Failed to add students");
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/students"] });
      toast({
        title: "Success",
        description: "Students added successfully",
      });
      setIsAddDialogOpen(false);
      setStudentForms([{ name: "", email: "", grade: "", classroomId: null, avatarUrl: null }]);
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add students",
        variant: "destructive",
      });
    },
  });

  const handleAddRow = () => {
    setStudentForms([...studentForms, { name: "", email: "", grade: "", classroomId: null, avatarUrl: null }]);
  };

  const handleRemoveRow = (index: number) => {
    if (studentForms.length > 1) {
      const newForms = studentForms.filter((_, i) => i !== index);
      setStudentForms(newForms);
      form.setValue("students", newForms);
    }
  };

  const handleStudentClick = (student: Student) => {
    setSelectedStudent(student);
    setIsDrawerOpen(true);
  };

  const onSubmit = (data: MultiStudentForm) => {
    addStudentMutation.mutate(data);
  };

  const stateColors = {
    green: "bg-success",
    yellow: "bg-warning",
    red: "bg-error",
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold" data-testid="text-page-title">Student Management</h1>
              <p className="text-sm text-muted-foreground">View and manage all students</p>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button data-testid="button-add-students">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Students
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add Multiple Students</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-3">
                      {studentForms.map((_, index) => (
                        <Card key={index}>
                          <CardContent className="pt-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <FormField
                                control={form.control}
                                name={`students.${index}.name`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                      <Input
                                        {...field}
                                        placeholder="Student name"
                                        data-testid={`input-name-${index}`}
                                        onChange={(e) => {
                                          field.onChange(e);
                                          const newForms = [...studentForms];
                                          newForms[index].name = e.target.value;
                                          setStudentForms(newForms);
                                        }}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name={`students.${index}.email`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                      <Input
                                        {...field}
                                        type="email"
                                        placeholder="student@email.com"
                                        data-testid={`input-email-${index}`}
                                        onChange={(e) => {
                                          field.onChange(e);
                                          const newForms = [...studentForms];
                                          newForms[index].email = e.target.value;
                                          setStudentForms(newForms);
                                        }}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <div className="flex gap-2">
                                <FormField
                                  control={form.control}
                                  name={`students.${index}.grade`}
                                  render={({ field }) => (
                                    <FormItem className="flex-1">
                                      <FormLabel>Grade</FormLabel>
                                      <Select
                                        onValueChange={(value) => {
                                          field.onChange(value);
                                          const newForms = [...studentForms];
                                          newForms[index].grade = value;
                                          setStudentForms(newForms);
                                        }}
                                        value={field.value}
                                      >
                                        <FormControl>
                                          <SelectTrigger data-testid={`select-grade-${index}`}>
                                            <SelectValue placeholder="Select grade" />
                                          </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                          <SelectItem value="Grade 8">Grade 8</SelectItem>
                                          <SelectItem value="Grade 9">Grade 9</SelectItem>
                                          <SelectItem value="Grade 10">Grade 10</SelectItem>
                                          <SelectItem value="Grade 11">Grade 11</SelectItem>
                                          <SelectItem value="Grade 12">Grade 12</SelectItem>
                                        </SelectContent>
                                      </Select>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                {studentForms.length > 1 && (
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="mt-8"
                                    onClick={() => handleRemoveRow(index)}
                                    data-testid={`button-remove-${index}`}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <Button type="button" variant="outline" onClick={handleAddRow} data-testid="button-add-row">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Another Student
                      </Button>
                      <Button type="submit" disabled={addStudentMutation.isPending} data-testid="button-submit">
                        {addStudentMutation.isPending ? "Adding..." : "Add All Students"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="text-center py-12">Loading students...</div>
        ) : students.length === 0 ? (
          <Card className="max-w-md mx-auto">
            <CardContent className="pt-6 text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-muted mx-auto flex items-center justify-center">
                <UserPlus className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">No students yet</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Get started by adding your first students
                </p>
              </div>
              <Button onClick={() => setIsAddDialogOpen(true)} data-testid="button-add-first">
                <UserPlus className="h-4 w-4 mr-2" />
                Add Students
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {students.length} student{students.length !== 1 ? "s" : ""}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {students.map((student) => {
                const initials = student.name.split(" ").map((n) => n[0]).join("").toUpperCase();
                const cognitiveState = (student.cognitiveState || "green") as "green" | "yellow" | "red";
                return (
                  <Card
                    key={student.id}
                    className="hover-elevate active-elevate-2 cursor-pointer"
                    onClick={() => handleStudentClick(student)}
                    data-testid={`card-student-${student.id}`}
                  >
                    <CardHeader className="flex flex-row items-center gap-4 pb-3">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold" data-testid={`text-name-${student.id}`}>
                          {student.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">{student.email}</p>
                      </div>
                      <div className={`h-2 w-2 rounded-full ${stateColors[cognitiveState]}`} />
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" data-testid={`badge-grade-${student.id}`}>
                          {student.grade}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {selectedStudent && (
        <StudentDrawer
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          student={{
            id: selectedStudent.id,
            name: selectedStudent.name,
            cognitiveState: (selectedStudent.cognitiveState || "green") as "green" | "yellow" | "red",
            metrics: {
              attention: 0.75,
              engagement: 0.70,
              stress: 0.30,
            },
          }}
        />
      )}
    </div>
  );
}
