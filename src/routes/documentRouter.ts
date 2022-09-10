import { Router } from "express";
import * as documentController from "../controllers/documentController";
import { schemaValidateMiddleware } from "../middlewares/schemaValidateMiddleware";
import { validateToken } from "../middlewares/validateTokenMiddleware";
import { documentSchema } from "../schemas/documentSchema";

const documentRouter = Router();

documentRouter.post(
  "/document",
  validateToken,
  schemaValidateMiddleware(documentSchema),
  documentController.createDocument
);
documentRouter.get(
  "/document/:id",
  validateToken,
  documentController.getDocument
);
documentRouter.get(
  "/documents",
  validateToken,
  documentController.getAllDocuments
);
documentRouter.delete(
  "/document/:id",
  validateToken,
  documentController.removeDocument
);

export { documentRouter };
