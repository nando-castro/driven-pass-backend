import { Router } from "express";
import { authRouter } from "./authRouter";
import { cardRouter } from "./cardRouter";
import { credentialRouter } from "./credentialRouter";
import { noteRouter } from "./noteRouter";
const router = Router();

router.use(authRouter);
router.use(credentialRouter);
router.use(noteRouter);
router.use(cardRouter);

export default router;
