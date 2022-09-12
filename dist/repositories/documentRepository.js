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
exports.findAll = exports.findById = exports.findByTitle = exports.deleteDocument = exports.insert = void 0;
const database_1 = __importDefault(require("../databases/database"));
function insert(data) {
    return __awaiter(this, void 0, void 0, function* () {
        yield database_1.default.document.create({ data });
    });
}
exports.insert = insert;
function deleteDocument(id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield database_1.default.document.delete({ where: { id } });
    });
}
exports.deleteDocument = deleteDocument;
function findByTitle(title, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const rows = yield database_1.default.document.findFirst({ where: {
                title: {
                    equals: title,
                    mode: "insensitive",
                },
                userId,
            }, });
        return rows;
    });
}
exports.findByTitle = findByTitle;
function findById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const rows = yield database_1.default.document.findUnique({ where: { id } });
        return rows;
    });
}
exports.findById = findById;
function findAll(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const rows = yield database_1.default.document.findMany({ where: { userId } });
        return rows;
    });
}
exports.findAll = findAll;
//# sourceMappingURL=documentRepository.js.map