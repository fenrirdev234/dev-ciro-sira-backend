import { Router } from "express";

import { createPostsController, getAllPostsController, getOnePostsController } from "../../controllers/postController";
import { multerUpload } from "../../middlewares/multerUpload";
import { schemaValition } from "../../middlewares/schemaValidator";
import { CreatePostSchema, GetAllPostSchema, GetOnePostSchema } from "../../schemas/postSchema.validation";

export const v1PostRouter = Router();

v1PostRouter.get("/", schemaValition(GetAllPostSchema), getAllPostsController);

v1PostRouter.get("/:postId", schemaValition(GetOnePostSchema), getOnePostsController);

v1PostRouter.post("/", multerUpload.single("image"), schemaValition(CreatePostSchema), createPostsController);

/**
 * @swagger
 * components:
 *   schemas:
 *     Jedi:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the Jedi
 *         name:
 *           type: string
 *           description: The name of the Jedi
 *       example:
 *         id: 1
 *         name: Luke Skywalker
 */

/**
 * @swagger
 * tags:
 *   name: Jedis
 *   description: The Jedis managing API
 */

/**
 * @swagger
 * /jedis:
 *   get:
 *     summary: Returns the list of all the Jedis
 *     tags: [Jedis]
 *     responses:
 *       200:
 *         description: The list of the Jedis
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Jedi'
 */

/**
 * @swagger
 * /jedis/{id}:
 *   get:
 *     summary: Get a Jedi by id
 *     tags: [Jedis]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The Jedi id
 *     responses:
 *       200:
 *         description: The Jedi description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Jedi'
 *       404:
 *         description: The Jedi was not found
 */

/**
 * @swagger
 * /jedis:
 *   post:
 *     summary: Create a new Jedi
 *     tags: [Jedis]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Jedi'
 *     responses:
 *       201:
 *         description: The Jedi was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Jedi'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /jedis/{id}:
 *   put:
 *     summary: Update a Jedi by the id
 *     tags: [Jedis]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The Jedi id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Jedi'
 *     responses:
 *       200:
 *         description: The Jedi was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Jedi'
 *       404:
 *         description: The Jedi was not found
 *       500:
 *         description: Some error happened
 */

/**
 * @swagger
 * /jedis/{id}:
 *   delete:
 *     summary: Remove the Jedi by id
 *     tags: [Jedis]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The Jedi id
 *     responses:
 *       200:
 *         description: The Jedi was deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Jedi'
 *       404:
 *         description: The Jedi was not found
 */
