import { z } from "zod";

export const metadataSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  isbn: z.string().optional(),
  coverImage: z.instanceof(File).nullable().optional(),
});

export const conversionSchema = z.object({
  file: z.instanceof(File, { message: "File is required" })
    .refine((file) => file.type === "application/pdf", {
      message: "Only PDF files are supported",
    })
    .refine((file) => file.size <= 500 * 1024 * 1024, {
      message: "File size must be less than 500MB",
    }),
  conversionType: z.enum(["epub", "markdown"]),
  metadataMode: z.enum(["auto", "manual"]),
  metadata: metadataSchema.optional(),
});

export type ConversionFormData = z.infer<typeof conversionSchema>;
export type MetadataFormData = z.infer<typeof metadataSchema>;