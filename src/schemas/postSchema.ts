import { InferSchemaType, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

export const postSchema = new Schema(
  {
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

    category: {
      type: String,
      required: true,
    },
    postId: {
      type: Schema.Types.ObjectId,

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
  },
  { timestamps: true, versionKey: false },
);

postSchema.plugin(mongoosePaginate);

postSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.postId = returnedObject.postId.toString();
    delete returnedObject._id;
  },
});

export type PostCollectionType = InferSchemaType<typeof postSchema>;

export type CreatePostServiceType = Pick<PostCollectionType, "title" | "author" | "readingTime" | "category" | "postImage">;

/* {
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
     blurHash: {
      hash: string;
      height: number;
      width: number;
    };
  };
}; */
