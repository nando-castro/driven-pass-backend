import { Router } from "express";
import { schemaValidateMiddleware } from "../middlewares/schemaValidateMiddleware";
import { noteSchema } from "./../schemas/noteSchema";
import * as noteController from "../controllers/noteController";
import { validateToken } from "../middlewares/validateTokenMiddleware";

const noteRouter = Router();

noteRouter.post(
  "/note",
  validateToken,
  schemaValidateMiddleware(noteSchema),
  noteController.createNote
);
noteRouter.get("/note/:id", validateToken, noteController.getNoteById);
noteRouter.get("/notes", validateToken, noteController.getNotes);
noteRouter.delete("/note/:id", validateToken, noteController.removeNote);

export { noteRouter };
