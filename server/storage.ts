import { db } from "./db";
import {
  profiles, counselingSessions, resources, jobs, forumPosts, forumReplies, goals,
  type Profile, type InsertProfile, type Session, type InsertSession,
  type Resource, type InsertResource, type Job, type InsertJob,
  type ForumPost, type InsertForumPost, type ForumReply, type InsertForumReply,
  type Goal, type InsertGoal,
} from "@shared/schema";
import { users } from "@shared/models/auth";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // Profiles
  getProfile(userId: string): Promise<Profile | undefined>;
  upsertProfile(userId: string, profile: Omit<InsertProfile, 'userId'>): Promise<Profile>;
  getAllCounselors(): Promise<(Profile & { user?: typeof users.$inferSelect })[]>;
  
  // Sessions
  getSessions(userId: string, role: string): Promise<(Session & { counselor?: typeof users.$inferSelect, user?: typeof users.$inferSelect })[]>;
  createSession(session: InsertSession): Promise<Session>;
  updateSessionStatus(id: number, status: string): Promise<Session>;
  
  // Resources
  getResources(type?: string): Promise<Resource[]>;
  createResource(resource: InsertResource): Promise<Resource>;
  
  // Jobs
  getJobs(search?: string): Promise<Job[]>;
  createJob(job: InsertJob): Promise<Job>;
  
  // Forum
  getForumPosts(category?: string): Promise<(ForumPost & { author?: typeof users.$inferSelect, replyCount?: number })[]>;
  getForumPost(id: number): Promise<(ForumPost & { author?: typeof users.$inferSelect, replies?: (ForumReply & { author?: typeof users.$inferSelect })[] }) | undefined>;
  createForumPost(post: InsertForumPost): Promise<ForumPost>;
  createForumReply(reply: InsertForumReply): Promise<ForumReply>;
  
  // Goals
  getGoals(userId: string): Promise<Goal[]>;
  createGoal(goal: InsertGoal): Promise<Goal>;
  updateGoalStatus(id: number, status: string): Promise<Goal>;
}

export class DatabaseStorage implements IStorage {
  // Profiles
  async getProfile(userId: string): Promise<Profile | undefined> {
    const [profile] = await db.select().from(profiles).where(eq(profiles.userId, userId));
    return profile;
  }

  async upsertProfile(userId: string, profileData: Omit<InsertProfile, 'userId'>): Promise<Profile> {
    const [existing] = await db.select().from(profiles).where(eq(profiles.userId, userId));
    if (existing) {
      const [updated] = await db.update(profiles)
        .set({ ...profileData, updatedAt: new Date() })
        .where(eq(profiles.userId, userId))
        .returning();
      return updated;
    }
    const [created] = await db.insert(profiles).values({ ...profileData, userId }).returning();
    return created;
  }

  async getAllCounselors(): Promise<(Profile & { user?: typeof users.$inferSelect })[]> {
    const results = await db.select({
      profile: profiles,
      user: users
    }).from(profiles)
      .innerJoin(users, eq(profiles.userId, users.id))
      .where(eq(profiles.role, 'counselor'));
      
    return results.map(r => ({ ...r.profile, user: r.user }));
  }

  // Sessions
  async getSessions(userId: string, role: string): Promise<(Session & { counselor?: typeof users.$inferSelect, user?: typeof users.$inferSelect })[]> {
    const condition = role === 'counselor' ? eq(counselingSessions.counselorId, userId) : eq(counselingSessions.userId, userId);
    
    // In a real implementation we would join with users to fetch counselor details
    // but returning basic list for MVP
    return (await db.select().from(counselingSessions).where(condition).orderBy(desc(counselingSessions.scheduledAt))) as any;
  }

  async createSession(session: InsertSession): Promise<Session> {
    const [created] = await db.insert(counselingSessions).values(session).returning();
    return created;
  }

  async updateSessionStatus(id: number, status: string): Promise<Session> {
    const [updated] = await db.update(counselingSessions).set({ status }).where(eq(counselingSessions.id, id)).returning();
    return updated;
  }

  // Resources
  async getResources(type?: string): Promise<Resource[]> {
    if (type) {
      return await db.select().from(resources).where(eq(resources.type, type)).orderBy(desc(resources.createdAt));
    }
    return await db.select().from(resources).orderBy(desc(resources.createdAt));
  }

  async createResource(resource: InsertResource): Promise<Resource> {
    const [created] = await db.insert(resources).values(resource).returning();
    return created;
  }

  // Jobs
  async getJobs(search?: string): Promise<Job[]> {
    return await db.select().from(jobs).orderBy(desc(jobs.createdAt));
  }

  async createJob(job: InsertJob): Promise<Job> {
    const [created] = await db.insert(jobs).values(job).returning();
    return created;
  }

  // Forum
  async getForumPosts(category?: string): Promise<(ForumPost & { author?: typeof users.$inferSelect, replyCount?: number })[]> {
    const posts = await db.select().from(forumPosts).orderBy(desc(forumPosts.createdAt));
    return posts as any;
  }

  async getForumPost(id: number): Promise<(ForumPost & { author?: typeof users.$inferSelect, replies?: (ForumReply & { author?: typeof users.$inferSelect })[] }) | undefined> {
    const [post] = await db.select().from(forumPosts).where(eq(forumPosts.id, id));
    if (!post) return undefined;
    
    const postReplies = await db.select().from(forumReplies).where(eq(forumReplies.postId, id)).orderBy(forumReplies.createdAt);
    return { ...post, replies: postReplies } as any;
  }

  async createForumPost(post: InsertForumPost): Promise<ForumPost> {
    const [created] = await db.insert(forumPosts).values(post).returning();
    return created;
  }

  async createForumReply(reply: InsertForumReply): Promise<ForumReply> {
    const [created] = await db.insert(forumReplies).values(reply).returning();
    return created;
  }

  // Goals
  async getGoals(userId: string): Promise<Goal[]> {
    return await db.select().from(goals).where(eq(goals.userId, userId)).orderBy(desc(goals.createdAt));
  }

  async createGoal(goal: InsertGoal): Promise<Goal> {
    const [created] = await db.insert(goals).values(goal).returning();
    return created;
  }

  async updateGoalStatus(id: number, status: string): Promise<Goal> {
    const [updated] = await db.update(goals).set({ 
      status, 
      completedAt: status === 'completed' ? new Date() : null 
    }).where(eq(goals.id, id)).returning();
    return updated;
  }
}

export const storage = new DatabaseStorage();
