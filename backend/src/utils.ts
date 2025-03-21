import dotenv from "dotenv";
import * as path from "path";

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
  const envPath = path.resolve(__dirname, "..", "..", ".env");
  dotenv.config({
    path: envPath,
    encoding: "utf8",
  });

  class EnvError extends Error {
    constructor(message: string) {
      super(message + " environment variable is required");
    }
  }

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      throw new EnvError(envVar);
    }
  }

  console.debug(`Loaded environment variables from ${envPath}`);
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
