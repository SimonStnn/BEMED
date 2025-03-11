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
  return joinPaths("http://localhost:8164", path || "");
}

export const requiredEnvVars = [
  "KEYCLOAK_FRONTEND_CLIENT_ID",
  "KEYCLOAK_CLIENT_SECRET",
  "KEYCLOAK_REALM",
  "DOMAIN",
  "DNS_PREFIX_KEYCLOAK",
  "DNS_PREFIX_BEMED_BACKEND",
] as const;

export type EnvVariable = (typeof requiredEnvVars)[number];

const { DNS_PREFIX_KEYCLOAK, DNS_PREFIX_BEMED_BACKEND, DOMAIN } =
  process.env as Record<EnvVariable, string>;
export const url = {
  keycloak: new URL(`http://${DNS_PREFIX_KEYCLOAK}.${DOMAIN}`),
  backend: new URL(`http://${DNS_PREFIX_BEMED_BACKEND}.${DOMAIN}`),
} as const;
