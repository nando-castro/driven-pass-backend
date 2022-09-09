import { Router } from "express";
import * as credentialController from "../controllers/credentialController";
import { schemaValidateMiddleware } from "../middlewares/schemaValidateMiddleware";
import { validateToken } from "../middlewares/validateTokenMiddleware";
import { credentialSchema } from "../schemas/credentialSchema";

const credentialRouter = Router();

credentialRouter.post(
  "/credential",
  validateToken,
  schemaValidateMiddleware(credentialSchema),
  credentialController.createCredential
);

credentialRouter.get(
  "/credential/:id",
  validateToken,
  credentialController.getCredential
);

credentialRouter.get(
  "/credentials",
  validateToken,
  credentialController.getAllCredentials
);

credentialRouter.delete(
  "/credential/:id",
  validateToken,
  credentialController.removeCredential
);

export { credentialRouter };
