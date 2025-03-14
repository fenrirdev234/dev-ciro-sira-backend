import { v2 as cloudinary } from "cloudinary";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import dbInit from "./database/mongo";
import { errorHandler } from "./middlewares/errorHandle";
import { rateLimiter } from "./middlewares/rateLimit";
import { unknownEndpoint } from "./middlewares/unknownEndpoint";
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} from "./utils/secret";
import { v1PostRouter } from "./v1/routes/postRouters";
import { logger } from "./utils/logger";
import { morganMiddleware } from "./middlewares/morganMiddleware";

export const app = express();

// Database Connection
dbInit();

// Global Middleware
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(morgan("tiny"));
app.use(morganMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rateLimiter);
app.use(
  cors({
    origin: "*",
    methods: "GET, POST",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
/* app.use('/docs', swaggerUI.serve, async (_req: express.Request, res: express.Response) => {
  return res.send(swaggerUI.generateHTML(await import('./swagger/')));
}); */

// Configuration
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

//route
app.get("/", (req, res) => {
  res.status(200).send("API is running");
});

app.use("/api/v1/posts", v1PostRouter);

// unknownEndpoint and errorHandler  Middleware
app.use(unknownEndpoint);
app.use(errorHandler);
