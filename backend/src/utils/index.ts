import dotenv from "dotenv";
import path from "path";
import fs from "fs";

const requiredEnvVars = [
  "KEYCLOAK_BACKEND_CLIENT_ID",
  "KEYCLOAK_CLIENT_SECRET",
  "KEYCLOAK_REALM",
  "BEMED_DOMAIN",
  "BEMED_DB_NAME",
  "BEMED_DB_USERNAME",
  "BEMED_DB_PASSWORD",
  "DNS_PREFIX_KEYCLOAK",
  "DNS_PREFIX_BEMED_BACKEND",
] as const;

export type EnvVariable = (typeof requiredEnvVars)[number];

export function loadEnv() {
  const envPath = path.resolve(__dirname, "..", "..", "..", ".env");
  const exists = fs.existsSync(envPath);

  if (exists) console.debug(`Loading environment variables from ${envPath}`);
  else console.debug("Using global environment variables");

  dotenv.config({
    // Only load .env if it exists
    // if it doesn't, the global environment variables will be used
    path: exists ? envPath : undefined,
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

const { DNS_PREFIX_KEYCLOAK, DNS_PREFIX_BEMED_BACKEND, BEMED_DOMAIN } =
  process.env as Record<EnvVariable, string>;
export const url = {
  keycloak: new URL(`http://${DNS_PREFIX_KEYCLOAK}.${BEMED_DOMAIN}`).toString(),
  backend: new URL(
    `http://${DNS_PREFIX_BEMED_BACKEND}.${BEMED_DOMAIN}`
  ).toString(),
} as const;
