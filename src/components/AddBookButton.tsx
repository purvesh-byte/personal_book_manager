"use client";

import { useState } from "react";
import AddBookForm from "@/components/AddBookForm";

export default function AddBookButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-md bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700"
      >
        + Add Book
      </button>

      {open && (
        <AddBookForm
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}