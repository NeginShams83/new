import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, email, password } = body;

    // Mock registration logic
    if (!username || !email || !password) {
      return NextResponse.json(
        {
          status: "error",
          message: "Missing required fields",
        },
        { status: 400 }
      );
    }

    // Mock successful registration
    return NextResponse.json({
      status: "success",
      message: "User registered successfully",
      data: {
        user: {
          id: String(Date.now()),
          username,
          email,
          role: "user",
        },
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
