import { Router } from "express";
import { createCredential } from "../controllers/credentialController";
import { schemaValidateMiddleware } from "../middlewares/schemaValidateMiddleware";
import { validateToken } from "../middlewares/validateTokenMiddleware";
import { credentialSchema } from "../schemas/credentialSchema";

const credentialRouter = Router();

credentialRouter.post(
  "/credential",
  validateToken,
  schemaValidateMiddleware(credentialSchema),
  createCredential
);

export { credentialRouter };
