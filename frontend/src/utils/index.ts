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
  return joinPaths(`http://${url.backend.toString()}:8164`, path || "");
}

export const requiredEnvVars = [
  "KEYCLOAK_FRONTEND_CLIENT_ID",
  "KEYCLOAK_CLIENT_SECRET",
  "KEYCLOAK_REALM",
  "BEMED_DOMAIN",
  "DNS_PREFIX_KEYCLOAK",
  "DNS_PREFIX_BEMED_BACKEND",
] as const;

export type EnvVariable = (typeof requiredEnvVars)[number];

const { DNS_PREFIX_KEYCLOAK, DNS_PREFIX_BEMED_BACKEND, BEMED_DOMAIN } =
  process.env as Record<EnvVariable, string>;
export const url = {
  keycloak: new URL(`http://${DNS_PREFIX_KEYCLOAK}.${BEMED_DOMAIN}`),
  backend: new URL(`http://${DNS_PREFIX_BEMED_BACKEND}.${BEMED_DOMAIN}`),
} as const;
