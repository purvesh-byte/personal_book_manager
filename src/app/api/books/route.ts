import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import connectDB from "@/lib/mongodb";
import { verifyToken } from "@/lib/auth";
import Book from "@/models/Book";

export async function POST(request: Request) {
  try {
    // Get JWT cookie
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    // Verify JWT
    const user = verifyToken(token);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid or expired session",
        },
        { status: 401 }
      );
    }

    // Get form data
    const body = await request.json();

    const {
      title,
      author,
      status,
      rating,
      tags,
      notes,
    } = body;

    // Validation
    if (!title?.trim() || !author?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Title and author are required",
        },
        { status: 400 }
      );
    }

    const allowedStatuses = [
      "Want to Read",
      "Reading",
      "Completed",
    ];

    if (status && !allowedStatuses.includes(status)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid reading status",
        },
        { status: 400 }
      );
    }

    if (
      rating !== null &&
      rating !== undefined &&
      (Number(rating) < 1 || Number(rating) > 5)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Rating must be between 1 and 5",
        },
        { status: 400 }
      );
    }

    await connectDB();

    // Create book
    const book = await Book.create({
      title: title.trim(),
      author: author.trim(),

      status: status || "Want to Read",

      rating:
        rating === null ||
        rating === undefined ||
        rating === ""
          ? undefined
          : Number(rating),

      tags: Array.isArray(tags)
        ? tags.map((tag: string) => tag.trim()).filter(Boolean)
        : [],

      notes: notes?.trim() || "",

      // IMPORTANT:
      // userId comes from JWT, NOT browser form.
      userId: user.userId,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Book added successfully",
        book,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Add book error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to add book",
      },
      { status: 500 }
    );
  }
}