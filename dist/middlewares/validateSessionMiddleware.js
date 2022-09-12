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
exports.validateSession = void 0;
const jwtUtils_1 = require("./../utils/jwtUtils");
const dateUtils_1 = require("./../utils/dateUtils");
const errorUtils_1 = require("./../utils/errorUtils");
const authRepository = __importStar(require("../repositories/authRepository"));
const dayjs_1 = __importDefault(require("dayjs"));
function validateSession(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = res.locals.token;
        const userData = yield (0, jwtUtils_1.jwtVerify)(token);
        const session = yield authRepository.findSession(userData.id);
        if (!session)
            throw (0, errorUtils_1.unauthorizedError)(`session no valid`);
        const dateNow = (0, dayjs_1.default)().format("DD/MM/YYYY HH:mm:ss");
        const dateSession = (0, dateUtils_1.formatDateNow)(session.createdAt);
        if (dateNow > dateSession)
            throw (0, errorUtils_1.unauthorizedError)(`session expired`);
        next();
    });
}
exports.validateSession = validateSession;
//# sourceMappingURL=validateSessionMiddleware.js.map