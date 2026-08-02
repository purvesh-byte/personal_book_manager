"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type AddBookFormProps = {
  onClose: () => void;
};

export default function AddBookForm({
  onClose,
}: AddBookFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState("Want to Read");
  const [rating, setRating] = useState("");
  const [tags, setTags] = useState("");
  const [notes, setNotes] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/books", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          title,
          author,
          status,

          rating:
            rating === ""
              ? null
              : Number(rating),

          tags: tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean),

          notes,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to add book");
        return;
      }

      onClose();

      router.refresh();
    } catch {
      setError("Unable to connect to the server");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg bg-white p-6 shadow-lg">

        {/* Header */}

        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            Add Book
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="text-xl text-gray-500 hover:text-gray-900"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6">

          {/* Error */}

          {error && (
            <div className="mb-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Title */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Title *
            </label>

            <input
              type="text"
              value={title}
              onChange={(event) =>
                setTitle(event.target.value)
              }
              required
              placeholder="e.g. Atomic Habits"
              className="w-full rounded-md border border-gray-300 px-3 py-2.5 outline-none focus:border-blue-500"
            />
          </div>

          {/* Author */}

          <div className="mt-5">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Author *
            </label>

            <input
              type="text"
              value={author}
              onChange={(event) =>
                setAuthor(event.target.value)
              }
              required
              placeholder="e.g. James Clear"
              className="w-full rounded-md border border-gray-300 px-3 py-2.5 outline-none focus:border-blue-500"
            />
          </div>

          {/* Status */}

          <div className="mt-5">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Reading Status
            </label>

            <select
              value={status}
              onChange={(event) =>
                setStatus(event.target.value)
              }
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 outline-none focus:border-blue-500"
            >
              <option value="Want to Read">
                Want to Read
              </option>

              <option value="Reading">
                Reading
              </option>

              <option value="Completed">
                Completed
              </option>
            </select>
          </div>

          {/* Rating */}

          <div className="mt-5">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Rating
            </label>

            <select
              value={rating}
              onChange={(event) =>
                setRating(event.target.value)
              }
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 outline-none focus:border-blue-500"
            >
              <option value="">Not rated</option>
              <option value="1">1 / 5</option>
              <option value="2">2 / 5</option>
              <option value="3">3 / 5</option>
              <option value="4">4 / 5</option>
              <option value="5">5 / 5</option>
            </select>
          </div>

          {/* Tags */}

          <div className="mt-5">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Tags
            </label>

            <input
              type="text"
              value={tags}
              onChange={(event) =>
                setTags(event.target.value)
              }
              placeholder="Programming, Productivity"
              className="w-full rounded-md border border-gray-300 px-3 py-2.5 outline-none focus:border-blue-500"
            />

            <p className="mt-1 text-xs text-gray-500">
              Separate tags using commas.
            </p>
          </div>

          {/* Notes */}

          <div className="mt-5">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Notes
            </label>

            <textarea
              value={notes}
              onChange={(event) =>
                setNotes(event.target.value)
              }
              rows={4}
              placeholder="Optional notes about this book"
              className="w-full resize-none rounded-md border border-gray-300 px-3 py-2.5 outline-none focus:border-blue-500"
            />
          </div>

          {/* Buttons */}

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:bg-blue-400"
            >
              {loading ? "Adding..." : "Add Book"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}