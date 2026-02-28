import express, { type Express } from "express";
import path from "path";

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "../client/dist");

  app.use(express.static(distPath));

  // Fallback to index.html for SPA routing
  app.get("*", (_req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}
