import { getAPIUrl } from "@/utils";
import { useAuthStore } from "@/stores/auth";

export type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
export async function sendRequest(props: {
  path: string;
  method: Method;
  body?: any;
}) {
  const authStore = useAuthStore();

  // Check if token exists before making the request
  if (!authStore.token) {
    console.error("Auth token is missing. User might not be logged in.");
    // Attempt to refresh auth if possible
    const refreshed = await authStore.checkAuth();
    if (!refreshed || !authStore.token) {
      throw new Error("Authentication required. Missing token.");
    }
  }

  let url = getAPIUrl(props.path);
  let options: RequestInit = {
    method: props.method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${authStore.token}`,
    },
    // Enable credentials to ensure cookies are sent if needed
    // credentials: "include",
  };

  // Add query parameters to the URL if the method is GET else add the data to the body
  if (props.method === "GET") {
    const queryParams = new URLSearchParams(props.body).toString();
    url += `?${queryParams}`;
  } else {
    options.body = JSON.stringify(props.body);
  }

  const res = await fetch(url, options);
  if (!res.ok) {
    if (res.status === 401 || res.status === 403) {
      await authStore.checkAuth();
      throw new Error(`Authentication error: ${res.status}`);
    }
    throw new Error(`HTTP: ${res.status}`);
  }
  return res;
}
