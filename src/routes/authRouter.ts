import { Router } from "express";
import * as authController from "../controllers/authController";
import { schemaValidateMiddleware } from "../middlewares/schemaValidateMiddleware";
import { loginSchema } from "../schemas/loginSchema";
import { registerSchema } from "../schemas/registerSchema";

const authRouter = Router();

authRouter.post(
  "/signup",
  schemaValidateMiddleware(registerSchema),
  authController.register
);
authRouter.post(
  "/signin",
  schemaValidateMiddleware(loginSchema),
  authController.login
);

export { authRouter };
