import { z } from "zod";

export const bookResponseSchema = z.object({
  kind: z.string(),
  totalItems: z.number(),
  items: z.array(
    z.object({
      kind: z.string(),
      id: z.string(),
      volumeInfo: z.object({
        title: z.string(),
        subtitle: z.string().optional(),
        authors: z.array(z.string()).optional(),
        publisher: z.string().optional(),
        publishedDate: z.string().optional(),
        description: z.string().optional(),
        categories: z.array(z.string()).optional(),
        imageLinks: z.object({
          thumbnail: z.string().url().optional(),
        }),
      }),
    }),
  ),
});

export type BookResponse = z.infer<typeof bookResponseSchema>;

export type Book = {
  id: string;
  title: string;
  subtitle?: string;
  authors?: Array<string>;
  publisher?: string;
  publishedDate?: string;
  description?: string;
  categories?: Array<string>;
  thumbnail?: string;
};
