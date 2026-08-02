import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { verifyToken } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import Book from "@/models/Book";

import LogoutButton from "@/components/LogoutButton";
import AddBookButton from "@/components/AddBookButton";
import BookLibrary from "@/components/BookLibrary";


export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  const user = verifyToken(token);

  if (!user) {
    redirect("/login");
  }
  await connectDB();

const books = await Book.find({
  userId: user.userId,
})
  .sort({ createdAt: -1 })
  .lean();

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      {/* NAVBAR */}
      <nav className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <h1 className="text-xl font-semibold">BookShelf</h1>

          <div className="flex items-center gap-6">
            <span className="hidden text-sm text-gray-700 sm:block">
                {user.email}
            </span>

            <LogoutButton />
          </div>
        </div>
      </nav>

      {/* CONTENT */}
      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* HEADER */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-3xl font-bold">My Library</h2>

            <p className="mt-2 text-gray-600">
              Keep track of the books you&apos;re reading.
            </p>
          </div>
          <AddBookButton />
             
         
        </div>

        {/* STATS */}
<div className="mt-10 grid gap-4 sm:grid-cols-3">

  {/* Total Books */}
  <div className="rounded-lg border border-gray-200 bg-white p-5">
    <p className="text-sm text-gray-600">
      Total Books
    </p>

    <p className="mt-2 text-2xl font-semibold">
      {books.length}
    </p>
  </div>

  {/* Currently Reading */}
  <div className="rounded-lg border border-gray-200 bg-white p-5">
    <p className="text-sm text-gray-600">
      Currently Reading
    </p>

    <p className="mt-2 text-2xl font-semibold">
      {
        books.filter(
          (book) => book.status === "Reading"
        ).length
      }
    </p>
  </div>

  {/* Completed */}
  <div className="rounded-lg border border-gray-200 bg-white p-5">
    <p className="text-sm text-gray-600">
      Completed
    </p>

    <p className="mt-2 text-2xl font-semibold">
      {
        books.filter(
          (book) => book.status === "Completed"
        ).length
      }
    </p>
  </div>

</div>

        {/* BOOK CARDS */}
        {/* BOOKS */}
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {/* BOOKS */}
          {books.length === 0 ? (
            <div className="mt-10 rounded-lg border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
              <h3 className="text-lg font-semibold text-gray-900">
                No books yet
              </h3>

              <p className="mt-2 text-sm text-gray-600">
                Add your first book to start building your library.
              </p>
            </div>
          ) : (
            <BookLibrary
              books={books.map((book) => ({
                _id: book._id.toString(),
                title: book.title,
                author: book.author,
                status: book.status,
                rating: book.rating,
                tags: book.tags,
                notes: book.notes,
              }))}
            />
          )}
        </div>
      </div>
    </main>
  );
}

 