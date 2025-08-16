import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Mock user data
    const user = {
      id: "1",
      username: "admin",
      email: "admin@example.com",
      role: "admin",
      createdAt: "2024-01-01T00:00:00Z",
    };

    return NextResponse.json({
      status: "success",
      data: { user },
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

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, email } = body;

    // Mock user update
    const updatedUser = {
      id: "1",
      username: username || "admin",
      email: email || "admin@example.com",
      role: "admin",
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      status: "success",
      message: "User updated successfully",
      data: { user: updatedUser },
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
