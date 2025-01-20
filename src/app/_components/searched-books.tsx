import { api } from "@/trpc/react";
import { type Book } from "@/types";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import BookModal from "./book-modal";
import Portal from "./portal";

type SearchedBooksProps = {
  books: Array<Book>;
};

function SearchedBooks({ books }: SearchedBooksProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const saveBookMutation = api.books.saveBook.useMutation();
  const handleSaveBook = async (book: Book) => {
    try {
      const savedBook = await saveBookMutation.mutateAsync(book);
      if (savedBook.id) {
        toast.success(`${savedBook.title} is saved`);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(`${book.title} failed to save on db`);
      }
    }
  };

  const handleModal = (book: Book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {books.map((book) => (
          <div
            key={book?.id}
            className="flex flex-col gap-y-2 rounded-lg bg-white p-4 text-black shadow-md"
          >
            <div className="flex w-full items-start justify-between">
              <div>
                <h3 className="text-lg font-bold">{book?.title}</h3>
                <p className="text-sm text-gray-700">
                  {book?.authors ? book.authors.join(", ") : "Unknown Author"}
                </p>
              </div>
              <div>
                <button
                  className="rounded-lg bg-purple-600 px-4 py-2 text-white transition hover:bg-purple-700"
                  onClick={() => handleSaveBook(book)}
                >
                  Save
                </button>
              </div>
            </div>
            {book?.thumbnail && (
              <Image
                width={400}
                height={400}
                src={book.thumbnail}
                alt={book?.title}
                className="mt-4 h-auto w-full rounded-md"
              />
            )}
            <div
              className="w-full cursor-pointer rounded-lg bg-purple-600 py-2 text-center font-medium text-white transition hover:bg-purple-700"
              onClick={() => handleModal(book)}
            >
              <p>Preview</p>
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <Portal>
          <BookModal
            onClose={() => setIsModalOpen(false)}
            selectedBook={selectedBook}
          />
        </Portal>
      )}
    </>
  );
}

export default SearchedBooks;
