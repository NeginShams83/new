import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Mock authentication logic
    if (username === "admin" && password === "admin123") {
      return NextResponse.json({
        status: "success",
        message: "Login successful",
        token: {
          accessToken: "mock-access-token",
          refreshToken: "mock-refresh-token",
        },
        data: {
          user: {
            id: "1",
            username: "admin",
            role: "admin",
          },
        },
      });
    }

    return NextResponse.json(
      {
        status: "error",
        message: "Invalid credentials",
      },
      { status: 401 }
    );
  } catch {
    return NextResponse.json(
      {
        status: "error",
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
