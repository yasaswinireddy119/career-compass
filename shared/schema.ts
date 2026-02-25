import { pgTable, serial, text, varchar, timestamp, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

/* ======================================================
   USERS TABLE (Replaces Replit Auth Users)
====================================================== */

export const users = pgTable("users", {
  id: varchar("id").primaryKey(), // we use string id (like local-dev-user)
  email: text("email"),
  firstName: text("first_name"),
  lastName: text("last_name"),
  createdAt: timestamp("created_at").defaultNow(),
});

/* ======================================================
   PROFILES
====================================================== */

export const profiles = pgTable("profiles", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  role: text("role").notNull().default("user"),
  bio: text("bio"),
  education: text("education"),
  skills: text("skills").array(),
  experience: text("experience"),
  interests: text("interests").array(),
  hourlyRate: integer("hourly_rate"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

/* ======================================================
   SESSIONS
====================================================== */

export const counselingSessions = pgTable("counseling_sessions", {
  id: serial("id").primaryKey(),
  counselorId: varchar("counselor_id")
    .notNull()
    .references(() => users.id),
  userId: varchar("user_id")
    .notNull()
    .references(() => users.id),
  scheduledAt: timestamp("scheduled_at").notNull(),
  status: text("status").notNull().default("pending"),
  notes: text("notes"),
  meetingLink: text("meeting_link"),
  createdAt: timestamp("created_at").defaultNow(),
});

/* ======================================================
   RESOURCES
====================================================== */

export const resources = pgTable("resources", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull(),
  content: text("content"),
  url: text("url"),
  authorId: varchar("author_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});

/* ======================================================
   JOBS
====================================================== */

export const jobs = pgTable("jobs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  company: text("company").notNull(),
  location: text("location").notNull(),
  description: text("description").notNull(),
  requirements: text("requirements").array(),
  url: text("url"),
  postedBy: varchar("posted_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});

/* ======================================================
   FORUM
====================================================== */

export const forumPosts = pgTable("forum_posts", {
  id: serial("id").primaryKey(),
  authorId: varchar("author_id")
    .notNull()
    .references(() => users.id),
  title: text("title").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const forumReplies = pgTable("forum_replies", {
  id: serial("id").primaryKey(),
  postId: integer("post_id")
    .notNull()
    .references(() => forumPosts.id, { onDelete: "cascade" }),
  authorId: varchar("author_id")
    .notNull()
    .references(() => users.id),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

/* ======================================================
   ASSESSMENTS
====================================================== */

export const assessments = pgTable("assessments", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  type: text("type").notNull(),
  results: jsonb("results").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

/* ======================================================
   GOALS
====================================================== */

export const goals = pgTable("goals", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  status: text("status").notNull().default("in_progress"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

/* ======================================================
   ZOD INSERT SCHEMAS
====================================================== */

export const insertProfileSchema = createInsertSchema(profiles).omit({ id: true, updatedAt: true });
export const insertSessionSchema = createInsertSchema(counselingSessions).omit({ id: true, createdAt: true });
export const insertResourceSchema = createInsertSchema(resources).omit({ id: true, createdAt: true });
export const insertJobSchema = createInsertSchema(jobs).omit({ id: true, createdAt: true });
export const insertForumPostSchema = createInsertSchema(forumPosts).omit({ id: true, createdAt: true });
export const insertForumReplySchema = createInsertSchema(forumReplies).omit({ id: true, createdAt: true });
export const insertAssessmentSchema = createInsertSchema(assessments).omit({ id: true, createdAt: true });
export const insertGoalSchema = createInsertSchema(goals).omit({ id: true, createdAt: true });