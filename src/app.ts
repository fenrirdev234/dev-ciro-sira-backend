import express from "express";
import cors from "cors";

import helmet from "helmet";
import morgan from "morgan";

import { v1PostRouter } from "./v1/routes/postRouters";
import { unknownEndpoint } from "./middlewares/unknownEndpoint";
import { errorHandler } from "./middlewares/errorHandle";
import { rateLimiter } from "./middlewares/rateLimit";
import dbInit from "./database/mongo";
import path from "path";

export const app = express();

// Database Connection
dbInit();

// Global Middleware
app.use(helmet());
app.use(morgan("tiny"));
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

//route
app.get("/", (req, res) => {
  res.status(200).send("API is running");
});
app.use("/public", express.static(path.resolve("uploads")));
app.use("/api/v1/posts", v1PostRouter);

// unknownEndpoint and errorHandler  Middleware
app.use(unknownEndpoint);
app.use(errorHandler);
