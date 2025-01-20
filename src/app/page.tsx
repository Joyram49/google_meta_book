import { HydrateClient } from "@/trpc/server";
import { BookSearch } from "./_components/book-search";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-4xl font-bold sm:text-5xl">
            Welcome to Book Finder
          </h1>
          <p className="max-w-2xl text-center text-lg">
            Use the search bar below to find books by their title. Powered by
            Google Books API.
          </p>
          <BookSearch />
        </div>
      </main>
    </HydrateClient>
  );
}
