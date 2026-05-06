import { NextRequest, NextResponse } from 'next/server';

const LOG_URL = "http://20.207.122.201/evaluation-service/logs";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJjaC5zYy51NGNzZTIzMjQ0QGNoLnN0dWRlbnRzLmFtcml0YS5lZHUiLCJleHAiOjE3NzgwNjMxNTcsImlhdCI6MTc3ODA2MjI1NywiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImQ4ZmZjMDhkLTZkNWEtNDg3Zi1iYmNkLTNlM2U3MWQxZWU3ZSIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InNocnV0aGlrYSByYWphbiIsInN1YiI6IjQ4NjkzNzY4LWFmNjYtNDZhMS1hODRkLTM5MDNkOThlZjdjYyJ9LCJlbWFpbCI6ImNoLnNjLnU0Y3NlMjMyNDRAY2guc3R1ZGVudHMuYW1yaXRhLmVkdSIsIm5hbWUiOiJzaHJ1dGhpa2EgcmFqYW4iLCJyb2xsTm8iOiJjaC5zYy51NGNzZTIzMjQ0IiwiYWNjZXNzQ29kZSI6IlBUQk1tUSIsImNsaWVudElEIjoiNDg2OTM3NjgtYWY2Ni00NmExLWE4NGQtMzkwM2Q5OGVmN2NjIiwiY2xpZW50U2VjcmV0IjoiSHNtcFFCaEZ2WmRZQndGTiJ9.-k-NibzqO6XC-7APfVXxu0DpGzCv6_nU6FKNl-y9ltc";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const response = await fetch(LOG_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  return NextResponse.json({ success: response.ok });
}
