import { v2 as cloudinary } from "cloudinary";
import type { NextFunction, Request, Response } from "express";

import { CreatePostBodyType, GetAllPostQueryType, GetOnePostParamsType } from "../schemas/postSchema.validation";
import { createPostService, getAllPostService, getOnePostService } from "../services/PostServices";

// TODO: change funtcion to class, because tsoa work with decorators

const getAllPostsController = async (req: Request<unknown, unknown, unknown, GetAllPostQueryType>, res: Response, next: NextFunction) => {
  try {
    const { limit, page, isDesc } = req.query;

    const isDescParse = isDesc ? JSON.parse(isDesc) : false;
    const isDescBool = typeof isDescParse === "boolean" ? isDescParse : false;
    const limitParse = parseInt(limit ?? "9", 10) || 9;
    const pageParse = parseInt(page ?? "1", 10) || 1;
    const post = await getAllPostService(limitParse, pageParse, isDescBool);

    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

const getOnePostsController = async (req: Request<GetOnePostParamsType>, res: Response, next: NextFunction) => {
  try {
    const postId = req.params.postId;

    const post = await getOnePostService(postId);
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

const createPostsController = async (req: Request<unknown, unknown, CreatePostBodyType>, res: Response, next: NextFunction) => {
  try {
    const { title, authorPhotoUrl, authorName, category, readingTime, postImageDescription } = req.body;

    const image = req.file;
    /*  const processedImage = sharp(image?.buffer);

    const webpImage = await createWebP(processedImage);

    const blurHastData = await createBlurHash(webpImage);
 */
    /*   const newName = imageName(image!.originalname, ".webp"); */

    const cloudinaryResponse: any = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            format: "webp",
          },
          (err, result) => {
            if (err) {
              reject(err);
            }
            resolve(result);
          },
        )
        .end(image?.buffer);
    });

    const cloudinaryUrl = cloudinary.url(cloudinaryResponse.public_id, {
      transformation: [
        {
          fetch_format: "webp",
          raw_transformation: "c_fit,h_750,w_750",
        },
      ],
    });

    const postToSave = {
      title,
      author: {
        name: authorName,
        photo: { url: authorPhotoUrl, alt: authorName },
      },
      readingTime,
      category,
      postImage: {
        url: cloudinaryUrl,
        alt: postImageDescription,
        /*   blurHash: blurHastData, */
      },
    };

    const post = await createPostService(postToSave);
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

export { createPostsController, getAllPostsController, getOnePostsController };
