import { defineStore } from "pinia";
import { ref } from "vue";
import Keycloak from "keycloak-js";
import { type EnvVariable, url } from "@/utils";

const { KEYCLOAK_REALM, KEYCLOAK_FRONTEND_CLIENT_ID } = process.env as Record<
  EnvVariable,
  string
>;
const KEYCLOAK_ON_LOAK: Keycloak.KeycloakOnLoad = "login-required";
const KEYCLOAK_TOKEN_MIN_VALIDITY = 30; // minutes

const keycloak = new Keycloak({
  url: url.keycloak.toString(),
  realm: KEYCLOAK_REALM,
  clientId: KEYCLOAK_FRONTEND_CLIENT_ID,
});

keycloak.onTokenExpired = () => {
  keycloak
    .updateToken()
    .then(function (refreshed) {
      if (refreshed) {
        console.debug("Token was successfully refreshed");
      }
    })
    .catch(function () {
      console.error("Failed to refresh the token, or the session has expired");
    });
};

export const useAuthStore = defineStore("auth", () => {
  const isLoggedIn = ref<boolean | null>(null);
  const userInfo = ref<Keycloak.KeycloakTokenParsed | null>(null);
  const token = ref<string | null>(null);
  const errorCode = ref<number | null>(null);

  async function login(): Promise<void> {
    try {
      const authenticated = await keycloak.init({ onLoad: KEYCLOAK_ON_LOAK });
      isLoggedIn.value = authenticated;
      if (authenticated && keycloak.token && keycloak.tokenParsed) {
        token.value = keycloak.token;
        userInfo.value = keycloak.tokenParsed;
      }
    } catch (error) {
      console.error(error);
      errorCode.value = -1;
    }
  }

  async function logout(
    options?: Keycloak.KeycloakLogoutOptions
  ): Promise<void> {
    await keycloak.logout(options);
    isLoggedIn.value = false;
    userInfo.value = null;
    token.value = null;

    console.log(keycloak.token, keycloak.tokenParsed);
  }

  async function checkAuth(): Promise<boolean> {
    try {
      if (isLoggedIn.value) {
        const refreshed = await keycloak.updateToken(
          KEYCLOAK_TOKEN_MIN_VALIDITY
        );

        const tokenParsed = keycloak.tokenParsed;
        if (refreshed && keycloak.token && tokenParsed) {
          token.value = keycloak.token;
          userInfo.value = tokenParsed;
        }
        return refreshed;
      }
    } catch (error) {
      console.error(error);
      await logout();
    }
    return false;
  }

  return {
    keycloak,
    isLoggedIn,
    userInfo,
    token,
    login,
    logout,
    checkAuth,
    errorCode,
  };
});
