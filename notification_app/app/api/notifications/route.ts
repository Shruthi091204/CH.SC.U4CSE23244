import { NextRequest, NextResponse } from 'next/server';

const API_URL = "http://20.207.122.201/evaluation-service/notifications";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJjaC5zYy51NGNzZTIzMjQ0QGNoLnN0dWRlbnRzLmFtcml0YS5lZHUiLCJleHAiOjE3NzgwNjUxODAsImlhdCI6MTc3ODA2NDI4MCwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImJlYzU1N2Y5LTkxY2UtNDNhMy1iZGI0LTc0Nzg2MDE2MDI2YiIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InNocnV0aGlrYSByYWphbiIsInN1YiI6IjQ4NjkzNzY4LWFmNjYtNDZhMS1hODRkLTM5MDNkOThlZjdjYyJ9LCJlbWFpbCI6ImNoLnNjLnU0Y3NlMjMyNDRAY2guc3R1ZGVudHMuYW1yaXRhLmVkdSIsIm5hbWUiOiJzaHJ1dGhpa2EgcmFqYW4iLCJyb2xsTm8iOiJjaC5zYy51NGNzZTIzMjQ0IiwiYWNjZXNzQ29kZSI6IlBUQk1tUSIsImNsaWVudElEIjoiNDg2OTM3NjgtYWY2Ni00NmExLWE4NGQtMzkwM2Q5OGVmN2NjIiwiY2xpZW50U2VjcmV0IjoiSHNtcFFCaEZ2WmRZQndGTiJ9.knQtHJZSQZDTlpYGWw2QTmWr-2xVx6si_EsS8_BxWq0";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const response = await fetch(`${API_URL}?${searchParams.toString()}`, {
    headers: {
      'Authorization': `Bearer ${TOKEN}`
    }
  });

  const data = await response.json();
  return NextResponse.json(data);
}
