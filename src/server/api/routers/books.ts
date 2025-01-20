import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { db } from "@/server/db";
import { type BookResponse, bookResponseSchema } from "@/types";
import { type Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";

const createBookInputSchema = z.object({
  id: z.string(),
  title: z.string(),
  subtitle: z.string().optional(),
  authors: z.array(z.string()).optional(),
  publisher: z.string().optional(),
  publishedDate: z.string().optional(),
  description: z.string().optional(),
  categories: z.array(z.string()).optional(),
  thumbnail: z.string().optional(),
});

export const booksRouter = createTRPCRouter({
  searchBooks: publicProcedure
    .input(
      z.object({
        title: z.string().min(1),
      }),
    )
    .query(async ({ input }) => {
      const { title } = input;
      const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
      const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
        title,
      )}&key=${apiKey}`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Failed to fetch data from Google Books API.",
          });
        }

        const data: unknown = await response.json();

        const validatedData: BookResponse = bookResponseSchema.parse(data);
        if (validatedData && validatedData?.totalItems === 0) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "No books found matching the given title.",
          });
        }

        // Return only the books from the response
        return validatedData.items.map((item) => ({
          id: item.id,
          title: item.volumeInfo.title,
          subtitle: item.volumeInfo.subtitle,
          authors: item.volumeInfo.authors ?? [],
          publisher: item.volumeInfo.publisher,
          publishedDate: item.volumeInfo.publishedDate,
          description: item.volumeInfo.description,
          categories: item.volumeInfo.categories ?? [],
          thumbnail: item.volumeInfo.imageLinks.thumbnail,
        }));
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message:
            error instanceof Error
              ? error.message
              : "An unexpected error occurred while fetching books.",
        });
      }
    }),
  saveBook: protectedProcedure
    .input(createBookInputSchema)
    .mutation(async ({ input, ctx }) => {
      if (!ctx.session.user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Please sign in to save books.",
        });
      }
      const data: Prisma.BookCreateInput = {
        id: input.id,
        title: input.title,
        subtitle: input.subtitle,
        authors: input.authors ?? [],
        publisher: input.publisher,
        publishedDate: input.publishedDate,
        description: input.description,
        categories: input.categories ?? [],
        thumbnail: input.thumbnail,
        user: { connect: { id: ctx.session.user.id } },
      };

      // check if the book is already in database
      const isAvailable = await db.book.findUnique({
        where: { id: data.id },
      });
      if (isAvailable) {
        throw new TRPCError({
          code: "CONFLICT",
          message: `${data.title} is already in the database.`,
        });
      }

      // save the book in database
      const savedBook = await db.book.create({ data });
      if (!savedBook) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to save book to the database.",
        });
      }
      return savedBook;
    }),
  getSavedBooks: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      const { userId } = input;
      const user = await db.book.findMany({
        where: { userId: userId },
      });
      return user;
    }),
});
