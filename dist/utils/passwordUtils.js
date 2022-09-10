"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.hashPassword = exports.decryptPassword = exports.cryptPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const cryptr_1 = __importDefault(require("cryptr"));
const cryptr = new cryptr_1.default(`${process.env.SECRET_KEY}`);
const cryptPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const result = cryptr.encrypt(password);
    return result;
});
exports.cryptPassword = cryptPassword;
const decryptPassword = (password) => {
    const result = cryptr.decrypt(password);
    return result;
};
exports.decryptPassword = decryptPassword;
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const result = bcrypt_1.default.hashSync(password, 10);
    return result;
});
exports.hashPassword = hashPassword;
const comparePassword = (password, passwordCompare) => __awaiter(void 0, void 0, void 0, function* () {
    const result = bcrypt_1.default.compare(password, passwordCompare);
    return result;
});
exports.comparePassword = comparePassword;
//# sourceMappingURL=passwordUtils.js.map