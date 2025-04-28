import { InferSchemaType, Schema } from "mongoose";

export const authSchema = new Schema({
  userName: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 20,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["user", "admin", "superAdmin"],
    default: "user",
  },
});

authSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export type AuthCollectionType = InferSchemaType<typeof authSchema>;

export type loginServicesTypes = Pick<AuthCollectionType, "email" | "password">;

export type registerServicesTypes = Pick<AuthCollectionType, "email" | "password" | "userName">;
