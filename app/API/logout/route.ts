import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    return NextResponse.json({
      status: "success",
      message: "Logout successful",
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
