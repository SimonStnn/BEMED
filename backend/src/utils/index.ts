import dotenv from "dotenv";
import path from "path";
import fs from "fs";

const ENV_PATH = path.resolve(__dirname, "..", "..", "..", ".env");

const requiredEnvVars = [
  "KEYCLOAK_BACKEND_CLIENT_ID",
  "KEYCLOAK_CLIENT_SECRET",
  "KEYCLOAK_REALM",
  "BEMED_DOMAIN",
  "BEMED_PROTOCOL",
  "BEMED_DB_NAME",
  "BEMED_DB_USERNAME",
  "BEMED_DB_PASSWORD",
  "DNS_PREFIX_KEYCLOAK",
  "DNS_PREFIX_BEMED_BACKEND",
  "NODE_ENV",
] as const;

export type EnvVariable = (typeof requiredEnvVars)[number];

export function loadEnv() {
  const exists = !inDocker();

  if (exists) console.debug(`Loading environment variables from ${ENV_PATH}`);
  else console.debug("Using global environment variables");

  dotenv.config({
    // Only load .env if it exists
    // if it doesn't, the global environment variables will be used
    path: exists ? ENV_PATH : undefined,
    encoding: exists ? "utf8" : undefined,
  });

  class EnvError extends Error {
    constructor(message: string) {
      super(message + " environment variable is required");
    }
  }

  for (const envVar of requiredEnvVars)
    if (!process.env[envVar]) throw new EnvError(envVar);
}
loadEnv();

const {
  DNS_PREFIX_KEYCLOAK,
  DNS_PREFIX_BEMED_BACKEND,
  BEMED_DOMAIN,
  BEMED_PROTOCOL,
} = process.env as Record<EnvVariable, string>;
export const url = {
  keycloak: new URL(
    `${BEMED_PROTOCOL}://${DNS_PREFIX_KEYCLOAK}.${BEMED_DOMAIN}`
  ).toString(),
  backend: new URL(
    `${BEMED_PROTOCOL}://${DNS_PREFIX_BEMED_BACKEND}.${BEMED_DOMAIN}`
  ).toString(),
  frontend: new URL(`${BEMED_PROTOCOL}://${BEMED_DOMAIN}`).toString(),
} as const;

export function inDocker(): boolean {
  // If the file doesn't exist, we are in Docker
  return !fs.existsSync(ENV_PATH);
}
