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
});

const { success, error, data } = envSchema.safeParse(process.env);

if (!success) {
  console.error("Error in env", error?.format());
  process.exit(1);
}

export const { PORT } = data;
