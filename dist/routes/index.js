"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authRouter_1 = require("./authRouter");
const cardRouter_1 = require("./cardRouter");
const credentialRouter_1 = require("./credentialRouter");
const documentRouter_1 = require("./documentRouter");
const networkRouter_1 = require("./networkRouter");
const noteRouter_1 = require("./noteRouter");
const router = (0, express_1.Router)();
router.use(authRouter_1.authRouter);
router.use(credentialRouter_1.credentialRouter);
router.use(noteRouter_1.noteRouter);
router.use(cardRouter_1.cardRouter);
router.use(networkRouter_1.networkRouter);
router.use(documentRouter_1.documentRouter);
exports.default = router;
//# sourceMappingURL=index.js.map