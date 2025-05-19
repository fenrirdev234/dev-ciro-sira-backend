import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";

import { CustomRequestWithToken } from "../interface/ICustomRequest";
import { LoginBodyType, RegisterBodyType } from "../schemas/authSchema.validation";
import { loginServices, registerService } from "../services/AuthServices";
import { JWT_PRIVATE_KEY } from "../utils/secret";

export const registerController = async (req: Request<unknown, unknown, RegisterBodyType>, res: Response, next: NextFunction) => {
  try {
    const { email, password, userName } = req.body;

    const { token } = await registerService({ email, password, userName });
    res.status(201).json(token);
  } catch (err) {
    next(err);

    /*   res.status(400).send(err.message); */
  }
};

export const loginController = async (req: Request<unknown, unknown, LoginBodyType>, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const token = loginServices({ email, password });
    res.status(200).json(token);
  } catch (err) {
    next(err);
    /* res.status(401).send(err.message); */
  }
};

export const verifyController = async (req: CustomRequestWithToken, res: Response) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({
      error: "Unauthorized",
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
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      error: "Unauthorized",
    });
  }
};
