import dotenv from "dotenv";
import fs from "fs";
import { z } from "zod";

if (fs.existsSync(".env")) {
  dotenv.config({ path: ".env" });
} else {
  console.error(".env file not found.");
}

const envSchema = z.object({
  PORT: z.string().min(1, "PORT is required"),
  NODE_ENV: z.string().min(1, "NODE_ENV is required"),
  MONGO_USER: z.string().min(1, "MONGO_USER is required"),
  MONGO_PASSWORD: z.string().min(1, "MONGO_PASSWORD is required"),
  MONGO_HOSTNAME: z.string().min(1, "MONGO_HOSTNAME is required"),
  MONGO_DATABASE: z.string().min(1, "MONGO_HOSTNAME is required"),
  MONGO_DATABASE_TEST: z.string().min(1, "MONGO_DATABASE_TEST is required"),
  MONGO_NAMEAPP: z.string().min(1, "MONGO_NAMEAPP is required"),
  SALT_ROUNDS: z.coerce.number().int("value must be an integer").positive("value must be an positive").lte(20),
  JWT_PRIVATE_KEY: z.string().min(1, "JWT_PRIVATE_KEY is required"),
  CLOUDINARY_CLOUD_NAME: z.string().min(1, "CLOUDINARY_CLOUD_NAME is required"),
  CLOUDINARY_API_KEY: z.string().min(1, "CLOUDINARY_API_KEY is required"),
  CLOUDINARY_API_SECRET: z.string().min(1, "CLOUDINARY_API_SECRET is required"),
});

const { success, error, data } = envSchema.safeParse(process.env);

if (!success) {
  console.error("Error in env", error?.format());
  process.exit(1);
}

const {
  PORT,
  NODE_ENV,
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_DATABASE_TEST,
  MONGO_NAMEAPP,
  SALT_ROUNDS,
  JWT_PRIVATE_KEY,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} = data;

const MONGO_DATABASE = NODE_ENV === "test" ? MONGO_DATABASE_TEST : data.MONGO_DATABASE;

export {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
  JWT_PRIVATE_KEY,
  MONGO_DATABASE,
  MONGO_HOSTNAME,
  MONGO_NAMEAPP,
  MONGO_PASSWORD,
  MONGO_USER,
  NODE_ENV,
  PORT,
  SALT_ROUNDS,
};
