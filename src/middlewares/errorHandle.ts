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
  if (error instanceof APIError) {
    res.status(error.status).json(error);
  } else if (error instanceof MulterError) {
    const errorFormmater = new APIError(400, error.name, error.message);
    res.status(400).json(errorFormmater);
  } else if (error.name === "CastError") {
    const errorFormmater = new APIError(400, error.name, "malformatted id");
    return res.status(errorFormmater.status).send(errorFormmater);
  } else if (error.name === "ValidationError") {
    const errorFormmater = new APIError(400, error.name, "Validation Error");
    return res.status(errorFormmater.status).json(errorFormmater);
  } else {
    // send generic error message
    return res.status(500).json({
      status: "error",
      message: "Something went wrong",
    });
  }

  /*  next(error); */
};
