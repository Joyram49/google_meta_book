import { type Book } from "@/types";
import Image from "next/image";

type BookModalProps = {
  onClose: () => void;
  selectedBook: Book | null;
};

const BookModal = ({ onClose, selectedBook }: BookModalProps) => {
  if (!selectedBook) {
    return null;
  }
  const dummyImg = "/assets/dummy-book.webp";
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6 shadow-lg">
        {/* Close Button */}
        <button
          className="absolute right-4 top-4 text-gray-500 hover:text-black focus:outline-none"
          onClick={onClose}
        >
          ✖
        </button>

        {/* Modal Header */}
        <h2 className="mb-4 text-center text-xl font-bold sm:text-left">
          {selectedBook.title}
        </h2>

        {/* Book Thumbnail */}
        <div className="mb-4 flex justify-center">
          <Image
            width={400}
            height={400}
            src={selectedBook.thumbnail ?? dummyImg}
            alt={selectedBook.title}
            className="h-auto max-w-full rounded-md"
          />
        </div>

        {/* Book Details */}
        <div className="space-y-3 text-sm">
          <p>
            <strong>Authors:</strong>{" "}
            {selectedBook.authors ? selectedBook.authors.join(", ") : "Unknown"}
          </p>
          <p>
            <strong>Publisher:</strong> {selectedBook.publisher ?? "N/A"}
          </p>
          <p>
            <strong>Published Date:</strong>{" "}
            {selectedBook.publishedDate ?? "N/A"}
          </p>
          <p>
            <strong>Categories:</strong>{" "}
            {selectedBook.categories
              ? selectedBook.categories.join(", ")
              : "N/A"}
          </p>
          <p>
            <strong>Description:</strong>{" "}
            {selectedBook.description ?? "No Description Available"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookModal;
