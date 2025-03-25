export function joinPaths(...paths: string[]): string {
  return paths
    .map((part, index) => {
      if (index === 0) {
        return part.trim().replace(/[/]*$/g, "");
      } else {
        return part.trim().replace(/(^[/]*|[/]*$)/g, "");
      }
    })
    .filter((part) => part.length)
    .join("/");
}

export function getAPIUrl(path?: string): string {
  return joinPaths(url.backend.toString(), path || "");
}

export const requiredEnvVars = [
  "KEYCLOAK_FRONTEND_CLIENT_ID",
  "KEYCLOAK_CLIENT_SECRET",
  "KEYCLOAK_REALM",
  "BEMED_DOMAIN",
  "DNS_PREFIX_KEYCLOAK",
  "DNS_PREFIX_BEMED_BACKEND",
  "NODE_ENV",
  "BEMED_PROTOCOL",
] as const;

export type EnvVariable = (typeof requiredEnvVars)[number];

const {
  DNS_PREFIX_KEYCLOAK,
  DNS_PREFIX_BEMED_BACKEND,
  BEMED_DOMAIN,
  BEMED_PROTOCOL,
} = process.env as Record<EnvVariable, string>;
export const url = {
  keycloak: new URL(
    `${BEMED_PROTOCOL}://${DNS_PREFIX_KEYCLOAK}.${BEMED_DOMAIN}`
  ),
  backend: new URL(
    `${BEMED_PROTOCOL}://${DNS_PREFIX_BEMED_BACKEND}.${BEMED_DOMAIN}`
  ),
} as const;
