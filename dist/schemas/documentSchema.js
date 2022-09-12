"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.documentSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.documentSchema = joi_1.default.object({
    title: joi_1.default.string().max(255).required(),
    name: joi_1.default.string().max(50).required(),
    type: joi_1.default.string().valid("rg", "cnh").required(),
    issueDate: joi_1.default.string().max(50).required(),
    validity: joi_1.default.string().max(50).required(),
    registerNumber: joi_1.default.string().max(50).required(),
    issuer: joi_1.default.string().max(50).required(),
});
//# sourceMappingURL=documentSchema.js.map