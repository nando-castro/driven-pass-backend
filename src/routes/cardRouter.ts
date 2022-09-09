import { Router } from "express";
import * as cardController from "../controllers/cardController";
import { schemaValidateMiddleware } from "../middlewares/schemaValidateMiddleware";
import { validateToken } from "../middlewares/validateTokenMiddleware";
import { cardSchema } from "../schemas/cardSchema";

const cardRouter = Router();

cardRouter.post(
  "/card",
  validateToken,
  schemaValidateMiddleware(cardSchema),
  cardController.createCard
);
cardRouter.get("/card/:id", validateToken, cardController.getCard);
cardRouter.get("/cards", validateToken, cardController.getAllCards);
cardRouter.delete("/card/:id", validateToken, cardController.removeCard);

export { cardRouter };
