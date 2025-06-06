import { z } from "zod";

export const GetAllPostSchema = z.object({
  query: z.object({
    limit: z.string().nonempty().optional(),
    page: z.string().nonempty().optional(),
    isDesc: z.string().nonempty().optional(),
  }),
});

export const GetOnePostSchema = z.object({
  params: z.object({
    postId: z.string().nonempty(),
  }),
});

/* const categoryTypesSchema = z.enum([
  "DIVERSITY",
  "COMPANY",
  "CRYPTO",
  "GLOBAL",
  "LEAK",
]); */
export const CreatePostSchema = z.object({
  body: z.object({
    title: z.string().nonempty().min(3, "Title must be at least 3 characters long").max(128, "Title must be less than 128 characters long"),

    authorName: z
      .string()
      .nonempty()
      .min(3, "Author name must be at least 3 characters long")
      .max(128, "Author name must be less than 128 characters long"),
    authorPhotoUrl: z.string().nonempty(),
    authorPhotoAlt: z.string().nonempty(),
    category: z.string().nonempty(),
    postImageDescription: z.string().nonempty("Image description is required"),

    readingTime: z.string().nonempty("Reading time is required"),
  }),
});

export type GetAllPostQueryType = z.infer<typeof GetAllPostSchema>["query"];
export type GetOnePostParamsType = z.infer<typeof GetOnePostSchema>["params"];
export type CreatePostBodyType = z.infer<typeof CreatePostSchema>["body"];
