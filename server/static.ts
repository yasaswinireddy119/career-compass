import express, { type Express } from "express";
import path from "path";

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "../dist/public");

  app.use(express.static(distPath));

  app.use((req, res, next) => {
    if (req.method !== "GET") return next();
    if (req.path.startsWith("/api")) return next();

    res.sendFile(path.join(distPath, "index.html"));
  });
}
