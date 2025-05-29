import type { Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { APIError } from "../utils/APIError";

export const unknownEndpoint = (request: Request, response: Response) => {
  const errorFormmater = new APIError(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND, "unknown endpoint");

  response.status(404).send(errorFormmater.toJSON());
};
