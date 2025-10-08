import { z } from "zod";

// Type definitions for the application
export type User = {
  id: string;
  username: string;
  password: string;
  role: string;
  name: string;
  avatarUrl?: string;
};

export type Classroom = {
  id: string;
  name: string;
  subject: string;
  teacherId: string;
  studentsCount: number;
};

export type CognitiveData = {
  id: string;
  studentId: string;
  deviceId: string;
  timestamp: Date;
  attention: number;
  engagement: number;
  stress: number;
  cognitiveState: string;
};

export type Device = {
  id: string;
  name: string;
  battery: number;
  signal: number;
  firmwareVersion: string;
  lastSeen: Date;
  status: string;
};

export type Student = {
  id: string;
  name: string;
  email: string;
  classroomId?: string;
  grade: string;
  avatarUrl?: string;
  cognitiveState: string;
};

export type Assessment = {
  id: string;
  title: string;
  subject: string;
  classroomId?: string;
  questions: string;
  createdAt: Date;
};

export type AssessmentResult = {
  id: string;
  assessmentId: string;
  studentId: string;
  answers: string;
  score: number;
  totalQuestions: number;
  submittedAt: Date;
};

export type CognitiveMetrics = {
  attention: number;
  engagement: number;
  stress: number;
};

export type CognitiveState = "green" | "yellow" | "red";

// Zod schemas for validation
export const insertUserSchema = z.object({
  username: z.string(),
  password: z.string(),
  role: z.string(),
  name: z.string(),
  avatarUrl: z.string().optional(),
});

export const insertStudentSchema = z.object({
  name: z.string(),
  email: z.string(),
  classroomId: z.string().optional(),
  grade: z.string(),
  avatarUrl: z.string().optional(),
});

export const insertAssessmentSchema = z.object({
  title: z.string(),
  subject: z.string(),
  classroomId: z.string().optional(),
  questions: z.string(),
});

export const insertAssessmentResultSchema = z.object({
  assessmentId: z.string(),
  studentId: z.string(),
  answers: z.string(),
  score: z.number(),
  totalQuestions: z.number(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertStudent = z.infer<typeof insertStudentSchema>;
export type InsertAssessment = z.infer<typeof insertAssessmentSchema>;
export type InsertAssessmentResult = z.infer<typeof insertAssessmentResultSchema>;

// Mock data for development
export const mockUsers: User[] = [
  {
    id: "1",
    username: "teacher1",
    password: "password123",
    role: "teacher",
    name: "John Smith",
    avatarUrl: "/avatars/teacher1.jpg",
  },
  {
    id: "2",
    username: "student1",
    password: "password123",
    role: "student",
    name: "Alice Johnson",
    avatarUrl: "/avatars/student1.jpg",
  },
];

export const mockClassrooms: Classroom[] = [
  {
    id: "1",
    name: "Math 101",
    subject: "Mathematics",
    teacherId: "1",
    studentsCount: 25,
  },
  {
    id: "2",
    name: "Science 201",
    subject: "Science",
    teacherId: "1",
    studentsCount: 20,
  },
];

export const mockStudents: Student[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@school.edu",
    classroomId: "1",
    grade: "10th",
    avatarUrl: "/avatars/student1.jpg",
    cognitiveState: "green",
  },
  {
    id: "2",
    name: "Bob Wilson",
    email: "bob@school.edu",
    classroomId: "1",
    grade: "10th",
    avatarUrl: "/avatars/student2.jpg",
    cognitiveState: "yellow",
  },
];

export const mockDevices: Device[] = [
  {
    id: "1",
    name: "Device Alpha",
    battery: 85,
    signal: 90,
    firmwareVersion: "1.2.3",
    lastSeen: new Date(),
    status: "online",
  },
  {
    id: "2",
    name: "Device Beta",
    battery: 45,
    signal: 75,
    firmwareVersion: "1.2.2",
    lastSeen: new Date(Date.now() - 300000), // 5 minutes ago
    status: "offline",
  },
];

export const mockCognitiveData: CognitiveData[] = [
  {
    id: "1",
    studentId: "1",
    deviceId: "1",
    timestamp: new Date(),
    attention: 0.85,
    engagement: 0.92,
    stress: 0.15,
    cognitiveState: "green",
  },
  {
    id: "2",
    studentId: "2",
    deviceId: "1",
    timestamp: new Date(),
    attention: 0.65,
    engagement: 0.70,
    stress: 0.35,
    cognitiveState: "yellow",
  },
];
