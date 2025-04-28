import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { AuthModel } from "../models/authModel";
import { loginServicesTypes, registerServicesTypes } from "../schemas/authSchema";
import { JWT_PRIVATE_KEY, SALT_ROUNDS } from "../utils/secret";

export const registerService = async ({ email, password, userName }: registerServicesTypes) => {
  const userIsRegistrated = await AuthModel.findOne({ email });

  if (userIsRegistrated) {
    throw new Error("Account already exists");
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const userCreated = await AuthModel.create({ email, password: hashedPassword, userName });

  return { userName: userCreated.userName, email: userCreated.email };
};

export const loginServices = async ({ email, password }: loginServicesTypes) => {
  const user = await AuthModel.findOne({ email });

  if (!user) {
    throw new Error("Account no exists");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Error password");
  }

  const token = jwt.sign({ userName: user.userName, role: user.role }, JWT_PRIVATE_KEY, {
    expiresIn: "1h",
  });

  return { token };
};
