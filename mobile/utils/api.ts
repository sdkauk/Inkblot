// utils/api.ts
import { config } from "../config";
import { auth0 } from "./auth0";

export async function api(
  path: string,
  options: RequestInit = {},
): Promise<Response> {
  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");
  headers.set("ngrok-skip-browser-warning", "true");

  try {
    const credentials = await auth0.credentialsManager.getCredentials();
    console.log("Got token:", credentials.accessToken);
    headers.set("Authorization", `Bearer ${credentials.accessToken}`);
  } catch (error) {
    console.error("Failed to get credentials:", error);
    throw new Error("Not authenticated");
  }

  const url = `${config.api.baseUrl}${path}`;
  console.log();
  console.log("Fetching:", url);

  return fetch(url, {
    ...options,
    headers,
  });
}
