import { z } from "zod";

import fs from "fs";
import dotenv from "dotenv";

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
} = data;

const MONGO_DATABASE =
  NODE_ENV === "test" ? MONGO_DATABASE_TEST : data.MONGO_DATABASE;

export {
  PORT,
  NODE_ENV,
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_NAMEAPP,
  MONGO_DATABASE,
};
