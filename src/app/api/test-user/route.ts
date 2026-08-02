import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST() {
  try {
    await connectDB();

    const existingUser = await User.findOne({
      email: "test@example.com",
    });

    if (existingUser) {
      return NextResponse.json({
        success: true,
        message: "Test user already exists",
        user: {
          id: existingUser._id,
          name: existingUser.name,
          email: existingUser.email,
        },
      });
    }

    const user = await User.create({
      name: "Test User",
      email: "test@example.com",
      password: "test123",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Test user created",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("User model test error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create test user",
      },
      { status: 500 }
    );
  }
}