import { InferSchemaType, Schema } from "mongoose";

export const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      minLength: 6,
      maxLength: 20,
      trim: true,
      unique: true,
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
    role: [
      {
        ref: "Role",
        type: Schema.Types.ObjectId,
        required: true,
      },
    ],
  },
  { versionKey: false, timestamps: true },
);

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject._id = returnedObject.id.toString();
    delete returnedObject._id;
  },
});

export type UserCollectionType = InferSchemaType<typeof userSchema>;

export type loginServicesTypes = Pick<UserCollectionType, "email" | "password">;

export type registerServicesTypes = Pick<UserCollectionType, "email" | "password" | "userName">;
