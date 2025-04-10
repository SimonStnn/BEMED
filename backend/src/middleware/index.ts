import cors from "cors";
import express, { type Express } from "express";
import session from "express-session";

import keycloak, { memoryStore } from "@/middleware/keycloak";
import logMiddleware from "@/middleware/log";
import error_handler from "@/middleware/error_handler";
import { EnvVariable } from "@/utils";

const { KEYCLOAK_CLIENT_SECRET } = process.env as Record<EnvVariable, string>;

export function setupMiddleware(app: Express) {
  console.debug("Setting up middleware...");

  // Log each request
  app.use(logMiddleware);

  // Handle errors
  app.use(error_handler);

  // Middleware to enable CORS
  app.use(
    cors({
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      allowedHeaders: "Content-Type, Authorization",
      credentials: true,
    })
  );

  // Middleware to parse JSON and URL-encoded data
  app.use(express.json());

  // Middleware to enable sessions
  app.use(
    session({
      secret: KEYCLOAK_CLIENT_SECRET,
      resave: false,
      saveUninitialized: true,
      store: memoryStore,
    })
  );

  // Keycloak middleware to protect routes
  app.use(keycloak.middleware());

  // Middleware to parse URL-encoded data
  app.use(express.urlencoded({ extended: true }));
}
