import jwt from "jsonwebtoken";

import { JWT_PRIVATE_KEY } from "../utils/secret";

export function createAccessToken(payload: { id: string }) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      JWT_PRIVATE_KEY,
      {
        expiresIn: "1h",
      },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      },
    );
  });
}
