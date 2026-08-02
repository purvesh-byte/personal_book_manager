import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";
import LogoutButton from "@/components/LogoutButton";

const books = [
  {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    status: "Reading",
    rating: 4,
    tags: ["Productivity", "Self Help"],
  },
  {
    id: 2,
    title: "Clean Code",
    author: "Robert C. Martin",
    status: "Completed",
    rating: 5,
    tags: ["Programming"],
  },
  {
    id: 3,
    title: "Deep Work",
    author: "Cal Newport",
    status: "Want to Read",
    rating: null,
    tags: ["Productivity"],
  },
  {
    id: 4,
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt",
    status: "Reading",
    rating: 5,
    tags: ["Programming"],
  },
];

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

          <button
            type="button"
            className="rounded-md bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700"
          >
            + Add Book
          </button>
        </div>

        {/* STATS */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-gray-200 bg-white p-5">
            <p className="text-sm text-gray-600">Total Books</p>

            <p className="mt-2 text-2xl font-semibold">
              {books.length}
            </p>
          </div>

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

        {/* SEARCH + FILTERS */}
        <div className="mt-8 flex flex-col justify-between gap-4 md:flex-row">
          <input
            type="text"
            placeholder="Search by title or author"
            className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500 md:max-w-sm"
          />

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="rounded-md bg-gray-900 px-4 py-2 text-sm text-white"
            >
              All
            </button>

            <button
              type="button"
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm"
            >
              Reading
            </button>

            <button
              type="button"
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm"
            >
              Completed
            </button>

            <button
              type="button"
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm"
            >
              Want to Read
            </button>
          </div>
        </div>

        {/* BOOK CARDS */}
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {books.map((book) => (
            <div
              key={book.id}
              className="rounded-lg border border-gray-200 bg-white p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold">
                    {book.title}
                  </h3>

                  <p className="mt-1 text-sm text-gray-600">
                    {book.author}
                  </p>
                </div>

                <span className="rounded-md bg-gray-100 px-3 py-1 text-xs">
                  {book.status}
                </span>
              </div>

              <div className="mt-6">
                <p className="text-xs uppercase text-gray-500">
                  Rating
                </p>

                <p className="mt-1 text-sm">
                  {book.rating
                    ? `${book.rating} / 5`
                    : "Not rated"}
                </p>
              </div>

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

              <div className="mt-6 flex gap-5 border-t border-gray-100 pt-4">
                <button
                  type="button"
                  className="text-sm font-medium text-blue-600"
                >
                  Edit
                </button>

                <button
                  type="button"
                  className="text-sm font-medium text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}