import { model } from "mongoose";

import { UserCollectionType, userSchema } from "../schemas/userSchema";

export const UserModel = model<UserCollectionType>("User", userSchema);
