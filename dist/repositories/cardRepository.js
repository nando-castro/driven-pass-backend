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
exports.findAll = exports.findByTitle = exports.findById = exports.deleteCard = exports.insert = void 0;
const database_1 = __importDefault(require("../databases/database"));
function insert(card) {
    return __awaiter(this, void 0, void 0, function* () {
        yield database_1.default.card.create({ data: card });
    });
}
exports.insert = insert;
function deleteCard(id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield database_1.default.card.delete({ where: { id } });
    });
}
exports.deleteCard = deleteCard;
function findById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const rows = yield database_1.default.card.findUnique({ where: { id } });
        return rows;
    });
}
exports.findById = findById;
function findByTitle(title) {
    return __awaiter(this, void 0, void 0, function* () {
        const rows = yield database_1.default.card.findFirst({ where: { title } });
        return rows;
    });
}
exports.findByTitle = findByTitle;
function findAll(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const rows = yield database_1.default.card.findMany({ where: { userId } });
        return rows;
    });
}
exports.findAll = findAll;
//# sourceMappingURL=cardRepository.js.map