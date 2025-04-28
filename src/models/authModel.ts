import { model } from "mongoose";

import { AuthCollectionType, authSchema } from "../schemas/authSchema";

export const AuthModel = model<AuthCollectionType>("Auth", authSchema);
