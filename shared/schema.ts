import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("student"),
  name: text("name").notNull(),
  avatarUrl: text("avatar_url"),
});

export const classrooms = pgTable("classrooms", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  subject: text("subject").notNull(),
  teacherId: varchar("teacher_id").notNull(),
  studentsCount: integer("students_count").notNull().default(0),
});

export const cognitiveData = pgTable("cognitive_data", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  studentId: varchar("student_id").notNull(),
  deviceId: varchar("device_id").notNull(),
  timestamp: timestamp("timestamp").notNull(),
  attention: real("attention").notNull(),
  engagement: real("engagement").notNull(),
  stress: real("stress").notNull(),
  cognitiveState: text("cognitive_state").notNull(),
});

export const devices = pgTable("devices", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  battery: integer("battery").notNull(),
  signal: integer("signal").notNull(),
  firmwareVersion: text("firmware_version").notNull(),
  lastSeen: timestamp("last_seen").notNull(),
  status: text("status").notNull().default("offline"),
});

export const students = pgTable("students", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  classroomId: varchar("classroom_id"),
  grade: text("grade").notNull(),
  avatarUrl: text("avatar_url"),
  cognitiveState: text("cognitive_state").default("green"),
});

export const assessments = pgTable("assessments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  subject: text("subject").notNull(),
  classroomId: varchar("classroom_id"),
  questions: text("questions").notNull(),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const assessmentResults = pgTable("assessment_results", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  assessmentId: varchar("assessment_id").notNull(),
  studentId: varchar("student_id").notNull(),
  answers: text("answers").notNull(),
  score: integer("score").notNull(),
  totalQuestions: integer("total_questions").notNull(),
  submittedAt: timestamp("submitted_at").notNull().default(sql`now()`),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  role: true,
  name: true,
  avatarUrl: true,
});

export const insertStudentSchema = createInsertSchema(students).omit({
  id: true,
  cognitiveState: true,
});

export const insertAssessmentSchema = createInsertSchema(assessments).omit({
  id: true,
  createdAt: true,
});

export const insertAssessmentResultSchema = createInsertSchema(assessmentResults).omit({
  id: true,
  submittedAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertStudent = z.infer<typeof insertStudentSchema>;
export type InsertAssessment = z.infer<typeof insertAssessmentSchema>;
export type InsertAssessmentResult = z.infer<typeof insertAssessmentResultSchema>;

export type User = typeof users.$inferSelect;
export type Classroom = typeof classrooms.$inferSelect;
export type CognitiveData = typeof cognitiveData.$inferSelect;
export type Device = typeof devices.$inferSelect;
export type Student = typeof students.$inferSelect;
export type Assessment = typeof assessments.$inferSelect;
export type AssessmentResult = typeof assessmentResults.$inferSelect;

export type CognitiveMetrics = {
  attention: number;
  engagement: number;
  stress: number;
};

export type CognitiveState = "green" | "yellow" | "red";
