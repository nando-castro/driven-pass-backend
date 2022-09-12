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
exports.updateSession = exports.findSession = exports.insertSession = exports.findByUser = exports.insert = void 0;
const database_1 = __importDefault(require("../databases/database"));
function insert(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        yield database_1.default.user.create({
            data: {
                email: email,
                password: password,
            },
        });
    });
}
exports.insert = insert;
function findByUser(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const rows = yield database_1.default.user.findFirst({
            where: { email: { equals: email, mode: "insensitive" } },
        });
        return rows;
    });
}
exports.findByUser = findByUser;
function insertSession(userId, token) {
    return __awaiter(this, void 0, void 0, function* () {
        yield database_1.default.session.create({
            data: {
                userId: userId,
                token: token,
            },
        });
    });
}
exports.insertSession = insertSession;
function findSession(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const rows = yield database_1.default.session.findFirst({
            where: {
                userId,
            },
        });
        return rows;
    });
}
exports.findSession = findSession;
function updateSession(token, newToken, dateNow) {
    return __awaiter(this, void 0, void 0, function* () {
        const rows = yield database_1.default.session.update({
            where: {
                token,
            },
            data: {
                token: newToken,
                createdAt: dateNow,
            },
        });
        return rows;
    });
}
exports.updateSession = updateSession;
//# sourceMappingURL=authRepository.js.map