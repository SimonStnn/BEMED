import { fileURLToPath, URL } from "node:url";

import dotenv from "dotenv";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import path from "path";
import fs from "fs";

import { requiredEnvVars } from "./src/utils";

const env: Record<string, string> = Object.assign({}, process.env) as Record<string, string>;

export function loadEnv() {
  const envPath = path.resolve(__dirname, "..", ".env");
  const exists = fs.existsSync(envPath);
  dotenv.config({
    // Only load .env if it exists
    // if it doesn't, the global environment variables will be used
    path: exists ? envPath : undefined,
    encoding: exists ? "utf8": undefined,
    processEnv: env,
  });

  class EnvError extends Error {
    constructor(message: string) {
      super(message + " environment variable is required");
    }
  }

  for (const envVar of requiredEnvVars) {
    if (!env[envVar]) {
      throw new EnvError(envVar);
    }
  }

  // Remove variables not in requiredEnvVars
  Object.keys(env).forEach((key) => {
    if (!requiredEnvVars.includes(key as (typeof requiredEnvVars)[number])) {
      delete env[key];
    }
  });

  if (exists)
    console.debug(`Loaded environment variables from ${envPath}`);
  else console.debug("Using global environment variables");
}
loadEnv();

// https://vite.dev/config/
export default defineConfig({
  define: {
    "process.env": env,
  },
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
