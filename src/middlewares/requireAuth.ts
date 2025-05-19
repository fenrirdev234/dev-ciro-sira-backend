import { NextFunction, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import { CustomRequestWithToken } from "../interface/ICustomRequest";
import { JWT_PRIVATE_KEY } from "../utils/secret";

export const requiredAuth = (req: CustomRequestWithToken, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(403).json({
      error: "No token provided",
    });
  }
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_PRIVATE_KEY);
    req.token = decoded as JwtPayload;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      error: "Unauthorized",
    });
  }
};
