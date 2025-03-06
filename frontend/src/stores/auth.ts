import { defineStore } from 'pinia';
import { ref } from 'vue';
import Cookies from 'js-cookie';

const AUTH_TOKEN_KEY = 'auth';

export const useAuthStore = defineStore('auth', () => {
  // This is dummy code, should be replaced later with real authentication logic
  const isLoggedIn = ref(false);

  function login() {
    isLoggedIn.value = true;
    Cookies.set(AUTH_TOKEN_KEY, 'true');
  }

  function logout() {
    isLoggedIn.value = false;
    Cookies.remove(AUTH_TOKEN_KEY);
  }

  function checkAuth() {
    isLoggedIn.value = Cookies.get(AUTH_TOKEN_KEY) === 'true';
  }

  return {
    isLoggedIn,
    login,
    logout,
    checkAuth
  };
});