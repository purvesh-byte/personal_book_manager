"use client";

import { useMemo, useState } from "react";
import EditBookButton from "@/components/EditBookButton";
import DeleteBookButton from "@/components/DeleteBookButton";

type Book = {
  _id: string;
  title: string;
  author: string;
  status: string;
  rating?: number;
  tags: string[];
  notes?: string;
};

type BookLibraryProps = {
  books: Book[];
};

export default function BookLibrary({ books }: BookLibraryProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [tagFilter, setTagFilter] = useState("All");

  // Get all unique tags from user's books
  const availableTags = useMemo(() => {
    const tags = books.flatMap((book) => book.tags);

    return Array.from(new Set(tags)).sort();
  }, [books]);

  // Filter books
  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        book.title.toLowerCase().includes(searchText) ||
        book.author.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "All" ||
        book.status === statusFilter;

      const matchesTag =
        tagFilter === "All" ||
        book.tags.includes(tagFilter);

      return matchesSearch && matchesStatus && matchesTag;
    });
  }, [books, search, statusFilter, tagFilter]);

  return (
    <>
      {/* SEARCH */}
      <div className="mt-8">
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by title or author"
          className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500 md:max-w-sm"
        />
      </div>

      {/* STATUS FILTERS */}
      <div className="mt-4 flex flex-wrap gap-2">
        {["All", "Reading", "Completed", "Want to Read"].map(
          (status) => (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status)}
              className={
                statusFilter === status
                  ? "rounded-md bg-gray-900 px-4 py-2 text-sm text-white"
                  : "rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              }
            >
              {status}
            </button>
          )
        )}
      </div>

      {/* TAG FILTER */}
      {availableTags.length > 0 && (
        <div className="mt-4">
          <select
            value={tagFilter}
            onChange={(event) =>
              setTagFilter(event.target.value)
            }
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 outline-none focus:border-blue-500"
          >
            <option value="All">All Tags</option>

            {availableTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* RESULT COUNT */}
      <p className="mt-5 text-sm text-gray-500">
        Showing {filteredBooks.length} of {books.length} books
      </p>

      {/* NO FILTER RESULTS */}
      {filteredBooks.length === 0 ? (
        <div className="mt-8 rounded-lg border border-dashed border-gray-300 bg-white px-6 py-14 text-center">
          <h3 className="text-lg font-semibold text-gray-900">
            No books found
          </h3>

          <p className="mt-2 text-sm text-gray-600">
            Try changing your search or filters.
          </p>
        </div>
      ) : (
        /* BOOK CARDS */
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {filteredBooks.map((book) => (
            <div
              key={book._id}
              className="rounded-lg border border-gray-200 bg-white p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {book.title}
                  </h3>

                  <p className="mt-1 text-sm text-gray-600">
                    {book.author}
                  </p>
                </div>

                <span className="whitespace-nowrap rounded-md bg-gray-100 px-3 py-1 text-xs text-gray-700">
                  {book.status}
                </span>
              </div>

              {/* Rating */}
              <div className="mt-6">
                <p className="text-xs uppercase tracking-wide text-gray-500">
                  Rating
                </p>

                <p className="mt-1 text-sm text-gray-800">
                  {book.rating
                    ? `${book.rating} / 5`
                    : "Not rated"}
                </p>
              </div>

              {/* Tags */}
              {book.tags.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {book.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-gray-100 px-3 py-1 text-xs text-gray-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Notes */}
              {book.notes && (
                <div className="mt-5">
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Notes
                  </p>

                  <p className="mt-1 text-sm text-gray-700">
                    {book.notes}
                  </p>
                </div>
              )}

              {/* ACTIONS */}
              <div className="mt-6 flex gap-5 border-t border-gray-100 pt-4">
                <EditBookButton book={book} />

                <DeleteBookButton
                  bookId={book._id}
                  bookTitle={book.title}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}