import { Router } from "express";

import { loginController, registerController } from "../../controllers/authController";
import { schemaValition } from "../../middlewares/schemaValidator";
import { LoginSchema, RegisterSchema } from "../../schemas/authSchema.validation";

export const v1AuthRouter = Router();

v1AuthRouter.post("/login", schemaValition(LoginSchema), loginController);

v1AuthRouter.post("/register", schemaValition(RegisterSchema), registerController);

/* v1AuthRouter.get("/verify", verifyController); */
