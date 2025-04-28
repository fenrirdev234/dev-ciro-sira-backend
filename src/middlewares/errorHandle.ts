import { isBoom } from "@hapi/boom";
import { Request } from "express";
import { MulterError } from "multer";

import { APIError } from "../utils/APIError";
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
    const errorFormmater = new APIError(400, error.name, error.message);
    res.status(400).json(errorFormmater);
  } else if (isBoom(error)) {
    const errorFormmater = new APIError(error.output.payload.statusCode, error.output.payload.error, error.output.payload.message);
    res.status(errorFormmater.status).json(errorFormmater);
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
