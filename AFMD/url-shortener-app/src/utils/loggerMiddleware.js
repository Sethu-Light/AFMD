// loggerMiddleware.js

import { API_URL, ACCESS_TOKEN } from "../config";

export async function logEvent({ stack, level, pkg, message }) {
  try {
    const response = await fetch(`${API_URL}/logs`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        stack,     // "frontend" or "backend"
        level,     // "debug", "info", "warn", "error", or "fatal"
        package: pkg, // package name (e.g., "component", "utils")
        message
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Logger error:", data);
    }

    return data;
  } catch (error) {
    console.error("Logger failed:", error);
    return null;
  }
}
