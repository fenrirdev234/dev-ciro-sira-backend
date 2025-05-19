import { roleModel } from "../models/roleModel";

export const createRoles = async () => {
  try {
    const count = await roleModel.estimatedDocumentCount();
    if (count > 0) return;

    await roleModel.insertMany([{ name: "admin" }, { name: "user" }]);
  } catch (err) {
    console.log(err);
  }
};
