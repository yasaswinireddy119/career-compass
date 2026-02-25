import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  const DEMO_USER_ID = "demo-user"; // since auth removed

  // ---------------- Profiles ----------------

  app.get(api.profiles.get.path, async (req, res) => {
    const profile = await storage.getProfile(DEMO_USER_ID);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.json(profile);
  });

  app.get(api.profiles.getByUserId.path, async (req, res) => {
    const profile = await storage.getProfile(req.params.userId);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.json(profile);
  });

  app.get(api.profiles.counselors.path, async (req, res) => {
    const counselors = await storage.getAllCounselors();
    res.json(counselors);
  });

  app.post(api.profiles.upsert.path, async (req, res) => {
    try {
      const input = api.profiles.upsert.input.parse(req.body);
      const profile = await storage.upsertProfile(DEMO_USER_ID, input);
      res.status(200).json(profile);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
        });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // ---------------- Sessions ----------------

  app.get(api.sessions.list.path, async (req, res) => {
    const sessions = await storage.getSessions(DEMO_USER_ID, "user");
    res.json(sessions);
  });

  app.post(api.sessions.create.path, async (req, res) => {
    try {
      const input = api.sessions.create.input.parse(req.body);
      const session = await storage.createSession({
        ...input,
        userId: DEMO_USER_ID,
        status: "pending",
      });
      res.status(201).json(session);
    } catch {
      res.status(400).json({ message: "Invalid request" });
    }
  });

  app.patch(api.sessions.updateStatus.path, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = api.sessions.updateStatus.input.parse(req.body);
      const session = await storage.updateSessionStatus(id, status);
      res.json(session);
    } catch {
      res.status(400).json({ message: "Invalid request" });
    }
  });

  // ---------------- Resources ----------------

  app.get(api.resources.list.path, async (req, res) => {
    const type = req.query.type as string | undefined;
    const resources = await storage.getResources(type);
    res.json(resources);
  });

  app.post(api.resources.create.path, async (req, res) => {
    try {
      const input = api.resources.create.input.parse(req.body);
      const resource = await storage.createResource({
        ...input,
        authorId: DEMO_USER_ID,
      });
      res.status(201).json(resource);
    } catch {
      res.status(400).json({ message: "Invalid request" });
    }
  });

  // ---------------- Jobs ----------------

  app.get(api.jobs.list.path, async (req, res) => {
    const search = req.query.search as string | undefined;
    const jobs = await storage.getJobs(search);
    res.json(jobs);
  });

  app.post(api.jobs.create.path, async (req, res) => {
    try {
      const input = api.jobs.create.input.parse(req.body);
      const job = await storage.createJob({
        ...input,
        postedBy: DEMO_USER_ID,
      });
      res.status(201).json(job);
    } catch {
      res.status(400).json({ message: "Invalid request" });
    }
  });

  // ---------------- Forum ----------------

  app.get(api.forum.listPosts.path, async (req, res) => {
    const category = req.query.category as string | undefined;
    const posts = await storage.getForumPosts(category);
    res.json(posts);
  });

  app.get(api.forum.getPost.path, async (req, res) => {
    const id = parseInt(req.params.id);
    const post = await storage.getForumPost(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  });

  app.post(api.forum.createPost.path, async (req, res) => {
    try {
      const input = api.forum.createPost.input.parse(req.body);
      const post = await storage.createForumPost({
        ...input,
        authorId: DEMO_USER_ID,
      });
      res.status(201).json(post);
    } catch {
      res.status(400).json({ message: "Invalid request" });
    }
  });

  app.post(api.forum.createReply.path, async (req, res) => {
    try {
      const postId = parseInt(req.params.id);
      const input = api.forum.createReply.input.parse(req.body);
      const reply = await storage.createForumReply({
        ...input,
        postId,
        authorId: DEMO_USER_ID,
      });
      res.status(201).json(reply);
    } catch {
      res.status(400).json({ message: "Invalid request" });
    }
  });

  // ---------------- Goals ----------------

  app.get(api.goals.list.path, async (req, res) => {
    const goals = await storage.getGoals(DEMO_USER_ID);
    res.json(goals);
  });

  app.post(api.goals.create.path, async (req, res) => {
    try {
      const input = api.goals.create.input.parse(req.body);
      const goal = await storage.createGoal({
        ...input,
        userId: DEMO_USER_ID,
      });
      res.status(201).json(goal);
    } catch {
      res.status(400).json({ message: "Invalid request" });
    }
  });

  app.patch(api.goals.update.path, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = api.goals.update.input.parse(req.body);
      const goal = await storage.updateGoalStatus(id, status);
      res.json(goal);
    } catch {
      res.status(400).json({ message: "Invalid request" });
    }
  });

  return httpServer;
}