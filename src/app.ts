import express from "express";
import cors from "cors";

import helmet from "helmet";
import morgan from "morgan";

import { v1PostRouter } from "./v1/routes/postRouters";
import { unknownEndpoint } from "./middleware/unknownEndpoint";
import { errorHandler } from "./middleware/errorHandle";
import { rateLimiter } from "./middleware/rateLimit";

export const app = express();

// Global Middleware
app.use(helmet());
app.use(morgan("tiny"));
app.use(express.json());
app.use(rateLimiter);
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/public", express.static("uploads/"));
//route

app.get("/", (req, res) => {
  res.status(200).send("API is running");
});

app.use("/api/v1/posts", v1PostRouter);

// unknownEndpoint and errorHandler  Middleware
app.use(unknownEndpoint);

app.use(errorHandler);
