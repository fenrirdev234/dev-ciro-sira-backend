import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  error: Error,
  req: Request,
  res: any,
  next: NextFunction
) => {
  console.log(error);
  console.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }

  /*  else {
    // send generic error message
    return res.status(error.status).json({
      status: 'error',
      message: 'Something went wrong'
      })} */

  next(error);
};
