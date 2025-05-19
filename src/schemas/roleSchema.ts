import { InferSchemaType, Schema } from "mongoose";

export const roleSchema = new Schema({ name: String }, { versionKey: false });

export type RoleCollectionType = InferSchemaType<typeof roleSchema>;
