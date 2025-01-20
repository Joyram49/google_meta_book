import { auth } from "@/server/auth";
import { api } from "@/trpc/server";

import Image from "next/image";
import { redirect } from "next/navigation";
import EmptyState from "./_components/empty-books";

const SavedBooksPage = async () => {
  const session = await auth();

  // Redirect if no user session exists
  if (!session?.user) {
    redirect("/sign-in");
  }

  // Fetch saved books
  const savedBooks = await api.books.getSavedBooks({ userId: session.user.id });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Page Heading and Description */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Saved Books</h1>
          <p className="mt-2 text-lg text-gray-600">
            Here you can find all the books {`you've`} saved for later reading.
            Keep track of your favorites and easily access them anytime.
          </p>
        </div>

        {/* Check if no saved books found */}
        {savedBooks?.length === 0 ? (
          <div className="flex items-center justify-center space-x-2 text-gray-500">
            <EmptyState />
          </div>
        ) : (
          // If books are found, display the saved books list
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {savedBooks?.map((book) => (
              <div
                key={book.id}
                className="flex flex-col overflow-hidden rounded-lg bg-white shadow-md transition duration-300 hover:shadow-lg"
              >
                <div className="relative">
                  <Image
                    src={book.thumbnail ?? "/assets/dummy-book.webp"}
                    alt={book.title}
                    width={400}
                    height={400}
                    className="h-48 w-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="truncate text-lg font-semibold text-gray-800">
                    {book.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {book.authors?.join(", ") ?? "Unknown Author"}
                  </p>
                  <p className="mt-2 text-sm text-gray-400">
                    {book.publisher ?? "Unknown Publisher"}
                  </p>
                  <p className="text-sm text-gray-400">
                    {book.publishedDate ?? "No Published Date"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedBooksPage;
