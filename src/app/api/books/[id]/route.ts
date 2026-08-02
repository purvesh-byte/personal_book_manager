import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import mongoose from "mongoose";

import connectDB from "@/lib/mongodb";
import { verifyToken } from "@/lib/auth";
import Book from "@/models/Book";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 1. Check authentication
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

    // 2. Get book ID
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid book ID",
        },
        { status: 400 }
      );
    }

    // 3. Read updated information
    const body = await request.json();

    const {
      title,
      author,
      status,
      rating,
      tags,
      notes,
    } = body;

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

    if (!allowedStatuses.includes(status)) {
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
      rating !== "" &&
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

    // 4. Update ONLY if this book belongs to this user
    const updatedBook = await Book.findOneAndUpdate(
      {
        _id: id,
        userId: user.userId,
      },
      {
        title: title.trim(),
        author: author.trim(),
        status,

        rating:
          rating === null ||
          rating === undefined ||
          rating === ""
            ? undefined
            : Number(rating),

        tags: Array.isArray(tags)
          ? tags
              .map((tag: string) => tag.trim())
              .filter(Boolean)
          : [],

        notes: notes?.trim() || "",
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedBook) {
      return NextResponse.json(
        {
          success: false,
          message: "Book not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Book updated successfully",
      book: updatedBook,
    });
  } catch (error) {
    console.error("Update book error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update book",
      },
      { status: 500 }
    );
  }
}