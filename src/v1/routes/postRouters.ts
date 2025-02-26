import { Router } from "express";
import { multerUpload } from "../../middlewares/multerUpload";
import {
  createPostsController,
  getAllPostsController,
  getOnePostsController,
} from "../../controllers/postController";
import { schemaValition } from "../../middlewares/schemaValidator";

import {
  CreatePostSchema,
  GetAllPostSchema,
  GetOnePostSchema,
} from "../../schemas/postSchema";
export const v1PostRouter = Router();

v1PostRouter.get("/", schemaValition(GetAllPostSchema), getAllPostsController);

v1PostRouter.get(
  "/:postId",
  schemaValition(GetOnePostSchema),
  getOnePostsController
);

v1PostRouter.post(
  "/",
  multerUpload.single("image"),

  schemaValition(CreatePostSchema),
  createPostsController
);
