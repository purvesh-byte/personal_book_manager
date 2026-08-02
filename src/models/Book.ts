import mongoose, { Schema, Document, Model } from "mongoose";

export type BookStatus = "Want to Read" | "Reading" | "Completed";

export interface IBook extends Document {
  title: string;
  author: string;
  status: BookStatus;
  rating?: number;
  tags: string[];
  notes?: string;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const BookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: [true, "Book title is required"],
      trim: true,
    },

    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
    },

    status: {
      type: String,
      enum: ["Want to Read", "Reading", "Completed"],
      default: "Want to Read",
    },

    rating: {
      type: Number,
      min: 1,
      max: 5,
    },

    tags: {
      type: [String],
      default: [],
    },

    notes: {
      type: String,
      trim: true,
      default: "",
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

const Book: Model<IBook> =
  mongoose.models.Book ||
  mongoose.model<IBook>("Book", BookSchema);

export default Book;