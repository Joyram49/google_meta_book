"use client";

import { api } from "@/trpc/react";
import { type Book } from "@/types";
import { AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import SearchedBooks from "./searched-books";

export const BookSearch = () => {
  const [query, setQuery] = useState<string>("");
  const [books, setBooks] = useState<Book[]>([]);
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");

  const { data, isLoading, isError, error } = api.books.searchBooks.useQuery(
    { title: debouncedQuery },
    { enabled: debouncedQuery.length > 0 },
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  // Set up debounce effect
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    // Cleanup timeout on every change
    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [query]);

  // Update books state immediately on debounced query change
  useEffect(() => {
    if (debouncedQuery.length > 0 && data) {
      const sanitizedData = data.map((book) => ({
        ...book,
        categories: book.categories?.filter(Boolean) || [],
      }));
      setBooks(sanitizedData);
    } else {
      setBooks([]);
    }
  }, [debouncedQuery, data]);

  // submit hanlder though it's not needed!
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (debouncedQuery.length > 0 && data) {
      const sanitizedData = data.map((book) => ({
        ...book,
        categories: book.categories?.filter(Boolean) || [],
      }));
      setBooks(sanitizedData);
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl">
      <form
        onSubmit={handleSearchSubmit}
        className="mb-8 flex items-center gap-2"
      >
        <input
          type="text"
          placeholder="Search for a book by title..."
          value={query}
          onChange={handleSearchChange}
          className="flex-grow rounded-lg px-4 py-2 text-black focus:outline-none focus:ring focus:ring-purple-500"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="rounded-lg bg-purple-600 px-4 py-2 text-white transition hover:bg-purple-700 disabled:bg-gray-500"
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </form>

      {/* Results Section */}
      <div>
        {isLoading && (
          <p className="text-center text-gray-500">
            <span className="animate-pulse">Loading...</span>
          </p>
        )}
        {isError && (
          <p className="text-center text-red-500">
            <AlertCircle className="mr-2 inline-block" />
            {error?.message}
          </p>
        )}
        {books.length > 0 && <SearchedBooks books={books} />}
        {!isLoading && !isError && books.length === 0 && query && (
          <p className="text-center text-gray-300">
            No results found for &quot;{query}&quot;.
          </p>
        )}
      </div>
    </div>
  );
};
