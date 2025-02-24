import { PostModel } from "../models/postModel";
import { CreatePostServiceType } from "../schemas/postSchema";

const options = {
  sort: { createdAt: -1 },
};

export const getAllPostService = async (limit: number, page: number) => {
  const response = await PostModel.paginate({}, { limit, page, ...options });

  return response;
};

export const getOnePostService = async (postId: string) => {
  const response = await PostModel.findOne({ postId: postId });

  return response;
};
export const createPostService = async (newPost: CreatePostServiceType) => {
  const response = await PostModel.create(newPost);
  return response;
};
