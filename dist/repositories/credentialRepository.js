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
exports.deleteById = exports.findAllCredentials = exports.findCredentialById = exports.findByTitle = exports.insert = void 0;
const database_1 = __importDefault(require("../databases/database"));
function insert(data) {
    return __awaiter(this, void 0, void 0, function* () {
        yield database_1.default.credential.create({
            data,
        });
    });
}
exports.insert = insert;
function findByTitle(userId, title) {
    return __awaiter(this, void 0, void 0, function* () {
        const rows = yield database_1.default.credential.findFirst({
            where: {
                title: {
                    equals: title,
                    mode: "insensitive",
                },
                userId,
            },
        });
        return rows;
    });
}
exports.findByTitle = findByTitle;
function findCredentialById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const rows = yield database_1.default.credential.findUnique({
            where: { id },
        });
        return rows;
    });
}
exports.findCredentialById = findCredentialById;
function findAllCredentials(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const rows = yield database_1.default.credential.findMany({
            where: { userId },
        });
        return rows;
    });
}
exports.findAllCredentials = findAllCredentials;
function deleteById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield database_1.default.credential.delete({ where: { id } });
    });
}
exports.deleteById = deleteById;
//# sourceMappingURL=credentialRepository.js.map