import { authSchema } from "../schemas/authSchema";
import { Router } from "express";
import * as authController from "../controllers/authController";
import { schemaValidateMiddleware } from "../middlewares/schemaValidateMiddleware";
const authRouter = Router();

authRouter.post(
  "/signup",
  schemaValidateMiddleware(authSchema),
  authController.register
);

export { authRouter };
