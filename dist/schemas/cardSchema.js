"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cardSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.cardSchema = joi_1.default.object({
    title: joi_1.default.string().max(255).required(),
    numero: joi_1.default.string().max(25).required(),
    cardholderName: joi_1.default.string().max(50).required(),
    password: joi_1.default.string().required(),
    securityCode: joi_1.default.string().max(3).required(),
    expirationDate: joi_1.default.string().max(20).required(),
    isVirtual: joi_1.default.boolean().required(),
    type: joi_1.default.string().valid("credit", "debit", "debit_credit").required(),
});
//# sourceMappingURL=cardSchema.js.map