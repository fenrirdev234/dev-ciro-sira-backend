import { NextFunction, Request, Response } from "express";

import { LoginBodyType, RegisterBodyType } from "../schemas/authSchema.validation";
import { loginServices, registerService } from "../services/AuthServices";

export const registerController = async (req: Request<unknown, unknown, RegisterBodyType>, res: Response, next: NextFunction) => {
  try {
    const { email, password, userName } = req.body;

    const user = await registerService({ email, password, userName });

    if (user) {
      console.log("hi");
    }
  } catch (err) {
    next(err);

    /*   res.status(400).send(err.message); */
  }
};

export const loginController = async (req: Request<unknown, unknown, LoginBodyType>, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    loginServices({ email, password });
  } catch (err) {
    next(err);
    /* res.status(401).send(err.message); */
  }
};

export const logoutController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("hi");
  } catch (err) {
    next(err);
  }
};
