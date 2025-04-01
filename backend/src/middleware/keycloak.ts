import session from "express-session";
import Keycloak from "keycloak-connect";

import { type EnvVariable, url } from "@/utils";

const { KEYCLOAK_BACKEND_CLIENT_ID, KEYCLOAK_REALM } = process.env as Record<
  EnvVariable,
  string
>;

export const memoryStore = new session.MemoryStore();

const keycloak = new Keycloak(
  { store: memoryStore },
  {
    realm: KEYCLOAK_REALM,
    resource: KEYCLOAK_BACKEND_CLIENT_ID,
    "auth-server-url": url.keycloak,
    "ssl-required": "external",
    "confidential-port": 0,
    "bearer-only": true,
  }
);
export default keycloak;
