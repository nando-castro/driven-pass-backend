import { Router } from "express";
import { schemaValidateMiddleware } from "../middlewares/schemaValidateMiddleware";
import { networkSchema } from "./../schemas/networkSchema";
import * as networkController from "../controllers/networkController";
import { validateToken } from "../middlewares/validateTokenMiddleware";

const networkRouter = Router();

networkRouter.post(
  "/network",
  validateToken,
  schemaValidateMiddleware(networkSchema),
  networkController.createNetwork
);
networkRouter.get(
  "/network/:id",
  validateToken,
  networkController.getNetworkById
);
networkRouter.get("/networks", validateToken, networkController.getNetworks);
networkRouter.delete(
  "/network/:id",
  validateToken,
  networkController.removeNetwork
);

export { networkRouter };
