"use client";

import { useState } from "react";
import EditBookForm from "@/components/EditBookForm";

type BookData = {
  _id: string;
  title: string;
  author: string;
  status: string;
  rating?: number;
  tags: string[];
  notes?: string;
};

export default function EditBookButton({
  book,
}: {
  book: BookData;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-sm font-medium text-blue-600 hover:text-blue-700"
      >
        Edit
      </button>

      {open && (
        <EditBookForm
          book={book}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}