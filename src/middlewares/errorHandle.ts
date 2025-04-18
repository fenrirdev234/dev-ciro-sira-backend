import { Request } from "express";
import { MulterError } from "multer";

import { logger } from "../utils/logger";

export const errorHandler = (
  error: any,
  req: Request,
  res: any,
  /* next: NextFunction */
) => {
  logger.error(error);
  logger.error(error.message);
  if (error instanceof MulterError) {
    res.status(error.code).json({ error: error.message });
  } else if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  } else {
    // send generic error message
    return res.status(500).json({
      status: "error",
      message: "Something went wrong",
    });
  }

  /*  next(error); */
};
