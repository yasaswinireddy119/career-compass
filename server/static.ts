import express, { type Express } from "express";
import path from "path";

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "../client/dist");

  app.use(express.static(distPath));

  // SPA fallback (Express 5 compatible)
  app.use((req, res, next) => {
    if (req.method !== "GET") return next();
    if (req.path.startsWith("/api")) return next();

    res.sendFile(path.join(distPath, "index.html"));
  });
}
