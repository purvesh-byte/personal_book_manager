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
    rating: 0,
    tags: ["Productivity"],
  },
  {
    id: 4,
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt",
    status: "Reading",
    rating: 4,
    tags: ["Programming", "Career"],
  },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      {/* Navbar */}
      <nav className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <h1 className="text-xl font-semibold">BookShelf</h1>

          <div className="flex items-center gap-5">
            <span className="hidden text-sm text-gray-600 sm:block">
              My Library
            </span>

            <button className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-6xl px-6 py-10">
        {/* Header */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-3xl font-bold">My Library</h2>

            <p className="mt-2 text-gray-600">
              Keep track of the books you&apos;re reading.
            </p>
          </div>

          <button className="rounded-md bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700">
            + Add Book
          </button>
        </div>

        {/* Stats */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-gray-200 bg-white p-5">
            <p className="text-sm text-gray-500">Total Books</p>
            <p className="mt-1 text-2xl font-semibold">4</p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-5">
            <p className="text-sm text-gray-500">Currently Reading</p>
            <p className="mt-1 text-2xl font-semibold">2</p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-5">
            <p className="text-sm text-gray-500">Completed</p>
            <p className="mt-1 text-2xl font-semibold">1</p>
          </div>
        </div>

        {/* Search and filters */}
        <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <input
            type="text"
            placeholder="Search by title or author"
            className="w-full rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 lg:max-w-sm"
          />

          <div className="flex flex-wrap gap-2">
            {["All", "Reading", "Completed", "Want to Read"].map(
              (filter, index) => (
                <button
                  key={filter}
                  className={
                    index === 0
                      ? "rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white"
                      : "rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                  }
                >
                  {filter}
                </button>
              )
            )}
          </div>
        </div>

        {/* Books */}
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {books.map((book) => (
            <article
              key={book.id}
              className="rounded-lg border border-gray-200 bg-white p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold">{book.title}</h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {book.author}
                  </p>
                </div>

                <span className="whitespace-nowrap rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
                  {book.status}
                </span>
              </div>

              {/* Rating */}
              <div className="mt-5">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  Rating
                </p>

                <p className="mt-1 text-sm text-gray-700">
                  {book.rating > 0
                    ? `${book.rating} / 5`
                    : "Not rated"}
                </p>
              </div>

              {/* Tags */}
              <div className="mt-4 flex flex-wrap gap-2">
                {book.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="mt-6 flex gap-4 border-t border-gray-100 pt-4">
                <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                  Edit
                </button>

                <button className="text-sm font-medium text-red-600 hover:text-red-700">
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}