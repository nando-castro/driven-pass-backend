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
exports.networkRouter = void 0;
const express_1 = require("express");
const schemaValidateMiddleware_1 = require("../middlewares/schemaValidateMiddleware");
const networkSchema_1 = require("./../schemas/networkSchema");
const networkController = __importStar(require("../controllers/networkController"));
const validateTokenMiddleware_1 = require("../middlewares/validateTokenMiddleware");
const networkRouter = (0, express_1.Router)();
exports.networkRouter = networkRouter;
networkRouter.post("/network", validateTokenMiddleware_1.validateToken, (0, schemaValidateMiddleware_1.schemaValidateMiddleware)(networkSchema_1.networkSchema), networkController.createNetwork);
networkRouter.get("/network/:id", validateTokenMiddleware_1.validateToken, networkController.getNetworkById);
networkRouter.get("/networks", validateTokenMiddleware_1.validateToken, networkController.getNetworks);
networkRouter.delete("/network/:id", validateTokenMiddleware_1.validateToken, networkController.removeNetwork);
//# sourceMappingURL=networkRouter.js.map