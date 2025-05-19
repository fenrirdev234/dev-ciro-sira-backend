import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface CustomRequestWithToken extends Request {
  token: string | JwtPayload;
}
