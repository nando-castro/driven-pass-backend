import { Router } from "express";
import { authRouter } from "./authRouter";
import { cardRouter } from "./cardRouter";
import { credentialRouter } from "./credentialRouter";
import { documentRouter } from "./documentRouter";
import { networkRouter } from "./networkRouter";
import { noteRouter } from "./noteRouter";
const router = Router();

router.use(authRouter);
router.use(credentialRouter);
router.use(noteRouter);
router.use(cardRouter);
router.use(networkRouter);
router.use(documentRouter);

export default router;
