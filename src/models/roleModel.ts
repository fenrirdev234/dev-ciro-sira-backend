import { model } from "mongoose";

import { RoleCollectionType, roleSchema } from "../schemas/roleSchema";

export const roleModel = model<RoleCollectionType>("Role", roleSchema);
