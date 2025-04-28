import { notFound } from "@hapi/boom";
import type { Request, Response } from "express";

import { APIError } from "../utils/APIError";
export const unknownEndpoint = (request: Request, response: Response) => {
  const errorBoom = notFound("unknown endpoint");

  const errorFormmater = new APIError(errorBoom.output.payload.statusCode, errorBoom.output.payload.error, errorBoom.output.payload.message);

  response.status(404).send(errorFormmater.toJSON());
};
