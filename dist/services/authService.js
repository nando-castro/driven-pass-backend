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
exports.loginUser = exports.registerUser = void 0;
const authRepository = __importStar(require("../repositories/authRepository"));
const errorUtils_1 = require("./../utils/errorUtils");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const passwordUtils_1 = require("../utils/passwordUtils");
function registerUser(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const userExists = yield authRepository.findByUser(email);
        if (userExists) {
            throw (0, errorUtils_1.conflictError)(`user already registered`);
        }
        const passcrypt = yield (0, passwordUtils_1.hashPassword)(password);
        yield authRepository.insert(email, passcrypt);
    });
}
exports.registerUser = registerUser;
function loginUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const userExists = yield authRepository.findByUser(user.email);
        if (!userExists) {
            throw (0, errorUtils_1.notFoundError)(`user not registered`);
        }
        const decryptpass = yield (0, passwordUtils_1.comparePassword)(user.password, userExists.password);
        if (!decryptpass) {
            throw (0, errorUtils_1.unauthorizedError)(`email or password incorrect`);
        }
        const data = {
            id: userExists.id,
        };
        const token = jsonwebtoken_1.default.sign(data, `${process.env.JWT_SECRETKEY}`, {
            expiresIn: 60 * 60 * 24,
        });
        return token;
    });
}
exports.loginUser = loginUser;
//# sourceMappingURL=authService.js.map