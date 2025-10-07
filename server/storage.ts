import { 
  type User, 
  type InsertUser,
  type Student,
  type InsertStudent,
  type Assessment,
  type InsertAssessment,
  type AssessmentResult,
  type InsertAssessmentResult
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllStudents(): Promise<Student[]>;
  getStudent(id: string): Promise<Student | undefined>;
  createStudent(student: InsertStudent): Promise<Student>;
  createStudents(students: InsertStudent[]): Promise<Student[]>;
  
  getAllAssessments(): Promise<Assessment[]>;
  getAssessment(id: string): Promise<Assessment | undefined>;
  createAssessment(assessment: InsertAssessment): Promise<Assessment>;
  
  getAssessmentResult(assessmentId: string, studentId: string): Promise<AssessmentResult | undefined>;
  createAssessmentResult(result: InsertAssessmentResult): Promise<AssessmentResult>;
  getStudentResults(studentId: string): Promise<AssessmentResult[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private students: Map<string, Student>;
  private assessments: Map<string, Assessment>;
  private assessmentResults: Map<string, AssessmentResult>;

  constructor() {
    this.users = new Map();
    this.students = new Map();
    this.assessments = new Map();
    this.assessmentResults = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id,
      role: insertUser.role || "student",
      avatarUrl: insertUser.avatarUrl || null
    };
    this.users.set(id, user);
    return user;
  }

  async getAllStudents(): Promise<Student[]> {
    return Array.from(this.students.values());
  }

  async getStudent(id: string): Promise<Student | undefined> {
    return this.students.get(id);
  }

  async createStudent(insertStudent: InsertStudent): Promise<Student> {
    const id = randomUUID();
    const student: Student = { 
      ...insertStudent, 
      id,
      avatarUrl: insertStudent.avatarUrl || null,
      classroomId: insertStudent.classroomId || null,
      cognitiveState: "green"
    };
    this.students.set(id, student);
    return student;
  }

  async createStudents(insertStudents: InsertStudent[]): Promise<Student[]> {
    const students: Student[] = [];
    for (const insertStudent of insertStudents) {
      const student = await this.createStudent(insertStudent);
      students.push(student);
    }
    return students;
  }

  async getAllAssessments(): Promise<Assessment[]> {
    return Array.from(this.assessments.values());
  }

  async getAssessment(id: string): Promise<Assessment | undefined> {
    return this.assessments.get(id);
  }

  async createAssessment(insertAssessment: InsertAssessment): Promise<Assessment> {
    const id = randomUUID();
    const assessment: Assessment = {
      ...insertAssessment,
      id,
      classroomId: insertAssessment.classroomId || null,
      createdAt: new Date()
    };
    this.assessments.set(id, assessment);
    return assessment;
  }

  async getAssessmentResult(assessmentId: string, studentId: string): Promise<AssessmentResult | undefined> {
    return Array.from(this.assessmentResults.values()).find(
      (result) => result.assessmentId === assessmentId && result.studentId === studentId
    );
  }

  async createAssessmentResult(insertResult: InsertAssessmentResult): Promise<AssessmentResult> {
    const id = randomUUID();
    const result: AssessmentResult = {
      ...insertResult,
      id,
      submittedAt: new Date()
    };
    this.assessmentResults.set(id, result);
    return result;
  }

  async getStudentResults(studentId: string): Promise<AssessmentResult[]> {
    return Array.from(this.assessmentResults.values()).filter(
      (result) => result.studentId === studentId
    );
  }
}

export const storage = new MemStorage();
