import cors from "cors";
import express, { type Express } from "express";
import session from "express-session";

import keycloak, { memoryStore } from "@/middleware/keycloak";
import { EnvVariable } from "@/utils";

const { KEYCLOAK_CLIENT_SECRET } = process.env as Record<EnvVariable, string>;

export function setupMiddleware(app: Express) {
  console.debug("Setting up middleware...");
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
  app.use(cors());
  app.use(
    session({
      secret: KEYCLOAK_CLIENT_SECRET,
      resave: false,
      saveUninitialized: true,
      store: memoryStore,
    })
  );
  app.use(keycloak.middleware());

  app.use(express.urlencoded({ extended: true }));
}
