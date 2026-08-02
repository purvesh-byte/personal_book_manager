import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      {/* Navbar */}
      <nav className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-semibold">
            BookShelf
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Login
            </Link>

            <Link
              href="/signup"
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            Keep your reading organized.
          </h1>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            A simple place to manage the books you want to read, the ones
            you&#39;re currently reading, and the books you&#39;ve completed.
          </p>

          <div className="mt-8 flex items-center gap-4">
            <Link
              href="/signup"
              className="rounded-md bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
            >
              Get Started
            </Link>

            <Link
              href="/login"
              className="rounded-md border border-gray-300 bg-white px-5 py-3 font-medium text-gray-700 hover:bg-gray-100"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="mt-24 grid gap-6 border-t border-gray-200 pt-10 md:grid-cols-3">
          <div>
            <h2 className="font-semibold">Manage your books</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Add books to your personal library and keep everything in one
              place.
            </p>
          </div>

          <div>
            <h2 className="font-semibold">Track reading status</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Mark books as want to read, currently reading, or completed.
            </p>
          </div>

          <div>
            <h2 className="font-semibold">Organize with tags</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Use tags and filters to quickly find books in your collection.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}