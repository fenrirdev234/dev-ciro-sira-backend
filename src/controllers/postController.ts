import fs from "fs";
import type { NextFunction, Request, Response } from "express";

import {
  CreatePostBodyType,
  GetAllPostQueryType,
  GetOnePostParamsType,
} from "../schemas/postSchema";
import {
  createPostService,
  getAllPostService,
  getOnePostService,
} from "../services/PostServices";
import { BACKEND_HOST } from "../utils/secret";
import sharp from "sharp";
import { resizeImage } from "../lib/sharp/resizeImage";
import { createWebP } from "../lib/sharp/createWedp";
import { createBlurHash } from "../lib/sharp/createBlurHash";
import { imageName } from "../utils/imageName";

const getAllPostsController = async (
  req: Request<unknown, unknown, unknown, GetAllPostQueryType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { limit, page } = req.query;
    const limitParse = parseInt(limit ?? "9", 10) || 9;
    const pageParse = parseInt(page ?? "1", 10) || 1;
    const post = await getAllPostService(limitParse, pageParse);

    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

const getOnePostsController = async (
  req: Request<GetOnePostParamsType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const postId = req.params.postId;

    const post = await getOnePostService(postId);
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

const createPostsController = async (
  req: Request<unknown, unknown, CreatePostBodyType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      title,
      authorPhotoUrl,
      authorName,
      category,
      readingTime,
      postImageDescription,
    } = req.body;

    const image = req.file;
    const processedImage = sharp(image?.buffer);

    const webpImage = await createWebP(processedImage);

    const blurHastData = await createBlurHash(webpImage);

    const newName = imageName(image!.originalname, ".webp");

    const imageUrl = `/public/${newName}`;

    fs.writeFileSync(`uploads/${newName}`, webpImage);

    const postToSave = {
      title,
      author: {
        name: authorName,
        photo: { url: authorPhotoUrl, alt: authorName },
      },
      readingTime,
      category,
      postImage: {
        url: `${BACKEND_HOST}${imageUrl}`,
        alt: postImageDescription,
        blurHash: blurHastData,
      },
    };

    const post = await createPostService(postToSave);
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

export { getAllPostsController, getOnePostsController, createPostsController };
