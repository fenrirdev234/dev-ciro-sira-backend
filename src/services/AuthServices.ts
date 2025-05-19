import bcrypt from "bcrypt";

import { createAccessToken } from "../lib/jwt";
import { UserModel } from "../models/userModel";
import { loginServicesTypes, registerServicesTypes } from "../schemas/userSchema";
import { SALT_ROUNDS } from "../utils/secret";

/* TODO: change auth token to cookies */
export const registerService = async ({ email, password, userName }: registerServicesTypes) => {
  const userIsRegistrated = await UserModel.findOne({ email });

  if (userIsRegistrated) {
    throw new Error("Account already exists");
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const userCreated = await UserModel.create({ email, password: hashedPassword, userName });

  const token = await createAccessToken({ id: userCreated.id });

  return { token };
};

export const loginServices = async ({ email, password }: loginServicesTypes) => {
  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new Error("Account no exists");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Error password");
  }

  const token = await createAccessToken({ id: user.id });

  return { token };
};
