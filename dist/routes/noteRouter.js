"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.noteRouter = void 0;
const express_1 = require("express");
const schemaValidateMiddleware_1 = require("../middlewares/schemaValidateMiddleware");
const noteSchema_1 = require("./../schemas/noteSchema");
const noteController = __importStar(require("../controllers/noteController"));
const validateTokenMiddleware_1 = require("../middlewares/validateTokenMiddleware");
const noteRouter = (0, express_1.Router)();
exports.noteRouter = noteRouter;
noteRouter.post("/note", validateTokenMiddleware_1.validateToken, (0, schemaValidateMiddleware_1.schemaValidateMiddleware)(noteSchema_1.noteSchema), noteController.createNote);
noteRouter.get("/note/:id", validateTokenMiddleware_1.validateToken, noteController.getNoteById);
noteRouter.get("/notes", validateTokenMiddleware_1.validateToken, noteController.getNotes);
noteRouter.delete("/note/:id", validateTokenMiddleware_1.validateToken, noteController.removeNote);
//# sourceMappingURL=noteRouter.js.map