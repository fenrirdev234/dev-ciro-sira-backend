import mongoose, { InferSchemaType, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { z } from "zod";

export const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: [3, "Title must be at least 3 characters long"],
    maxlength: [128, "Title must be less than 128 characters long"],
  },
  author: {
    name: {
      type: String,
      required: true,
      minlength: [3, "Author must be at least 3 characters long"],
      maxlength: [128, "Author must be less than 128 characters long"],
    },
    photo: {
      url: {
        type: String,
        required: true,
      },
      alt: {
        type: String,
        required: true,
      },
    },
  },
  readingTime: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: String,
    required: true,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    default: new mongoose.mongo.ObjectId(),
    required: true,
  },
  postImage: {
    url: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: true,
    },
    /*   blurHash: {
      hash: {
        type: String,
        required: true,
      },
      height: {
        type: Number,
        required: true,
      },
      width: {
        type: Number,
        required: true,
      },
    }, */
  },
});

postSchema.plugin(mongoosePaginate);

postSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.postId = returnedObject.postId.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const GetAllPostSchema = z.object({
  query: z.object({
    limit: z.string().nonempty().optional(),
    page: z.string().nonempty().optional(),
  }),
});

export const GetOnePostSchema = z.object({
  params: z.object({
    postId: z.string().nonempty(),
  }),
});

const categoryTypesSchema = z.enum([
  "DIVERSITY",
  "COMPANY",
  "CRYPTO",
  "GLOBAL",
  "LEAK",
]);
export const CreatePostSchema = z.object({
  body: z.object({
    title: z
      .string()
      .nonempty()
      .min(3, "Title must be at least 3 characters long")
      .max(128, "Title must be less than 128 characters long"),

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

export type PostCollectionType = InferSchemaType<typeof postSchema>;
export type GetAllPostQueryType = z.infer<typeof GetAllPostSchema>["query"];
export type GetOnePostParamsType = z.infer<typeof GetOnePostSchema>["params"];
export type CreatePostBodyType = z.infer<typeof CreatePostSchema>["body"];
export type CreatePostServiceType = {
  title: string;
  author: {
    name: string;
    photo: { url: string; alt: string };
  };
  readingTime: string;
  category: string;
  postImage: {
    url: string;
    alt: string;
    /*  blurHash: {
      hash: string;
      height: number;
      width: number;
    }; */
  };
};
