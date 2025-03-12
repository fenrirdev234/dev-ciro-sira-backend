import { model, PaginateModel } from "mongoose";

import { PostCollectionType, postSchema } from "../schemas/postSchema";

export const PostModel = model<
  PostCollectionType,
  PaginateModel<PostCollectionType>
>("Post", postSchema);
