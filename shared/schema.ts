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

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  role: true,
  name: true,
  avatarUrl: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Classroom = typeof classrooms.$inferSelect;
export type CognitiveData = typeof cognitiveData.$inferSelect;
export type Device = typeof devices.$inferSelect;

export type CognitiveMetrics = {
  attention: number;
  engagement: number;
  stress: number;
};

export type CognitiveState = "green" | "yellow" | "red";
