import { getAPIUrl } from "@/utils";
import { useAuthStore } from "@/stores/auth";

export type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
export async function sendRequest(props: {
  path: string;
  method: Method;
  body?: any;
}) {
  const authStore = useAuthStore();

  let url = getAPIUrl(props.path);
  let options: RequestInit = {
    method: props.method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${authStore.token}`, // Retrieve token from cookies
    },
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
    throw new Error(`HTTP: ${res.status}`);
  }
  return res;
}
