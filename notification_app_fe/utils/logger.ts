import { LogLevel, LogPackage } from "../types/notification";

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJjaC5zYy51NGNzZTIzMjQ0QGNoLnN0dWRlbnRzLmFtcml0YS5lZHUiLCJleHAiOjE3NzgwNjIxMjQsImlhdCI6MTc3ODA2MTIyNCwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjI0ZWRhNTcwLWYzZjYtNDQxOC1iZjRiLTA2NWU5ZmNmNjExMyIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InNocnV0aGlrYSByYWphbiIsInN1YiI6IjQ4NjkzNzY4LWFmNjYtNDZhMS1hODRkLTM5MDNkOThlZjdjYyJ9LCJlbWFpbCI6ImNoLnNjLnU0Y3NlMjMyNDRAY2guc3R1ZGVudHMuYW1yaXRhLmVkdSIsIm5hbWUiOiJzaHJ1dGhpa2EgcmFqYW4iLCJyb2xsTm8iOiJjaC5zYy51NGNzZTIzMjQ0IiwiYWNjZXNzQ29kZSI6IlBUQk1tUSIsImNsaWVudElEIjoiNDg2OTM3NjgtYWY2Ni00NmExLWE4NGQtMzkwM2Q5OGVmN2NjIiwiY2xpZW50U2VjcmV0IjoiSHNtcFFCaEZ2WmRZQndGTiJ9.2P7qdPtgrfDNvzCTbbkFaCUu7qGYxhKEfdL8ETPYNpM";

export async function Log(stack: string, level: LogLevel, pkg: LogPackage, message: string) {
  try {
    await fetch("/api/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${TOKEN}`
      },
      body: JSON.stringify({
        stack,
        level,
        package: pkg,
        message
      })
    });
  } catch (error) {
    console.error("Failed to send log:", error);
  }
}
