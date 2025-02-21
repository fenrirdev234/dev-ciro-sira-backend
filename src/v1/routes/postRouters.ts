import { Router } from "express";
import { multerUpload } from "../../middleware/multerUpload";

export const v1PostRouter = Router();

v1PostRouter.get("/", (require, response) => {
  response.send("API");
});

v1PostRouter.post(
  "/",
  multerUpload.single("imageFile"),
  (require, response) => {
    response.send("API");
  }
);
