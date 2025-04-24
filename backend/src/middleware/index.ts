import cors from "cors";
import express, { type Express } from "express";

import logMiddleware from "@/middleware/log";
import error_handler from "@/middleware/error_handler";
import jwtMiddleware from "@/middleware/jwt";
import { type EnvVariable, url } from "@/utils";

export function setupMiddleware(app: Express) {
  console.debug("Setting up middleware...");

  // Log each request
  app.use(logMiddleware);

  // Handle errors
  app.use(error_handler);

  // Middleware to enable CORS
  app.use(
    cors()
  );

  // Middleware to parse JSON and URL-encoded data
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // JWT error handler - must be after JWT middleware is applied to routes but before other error handlers
  app.use(jwtMiddleware.handleJwtErrors as any);
}
