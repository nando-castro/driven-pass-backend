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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllDocument = exports.getDocument = exports.removeDocument = exports.createCard = void 0;
const dateUtils_1 = require("./../utils/dateUtils");
const jwtUtils_1 = require("../utils/jwtUtils");
const documentRepository = __importStar(require("../repositories/documentRepository"));
const errorUtils_1 = require("../utils/errorUtils");
function createCard(document, token) {
    return __awaiter(this, void 0, void 0, function* () {
        const dataUser = yield (0, jwtUtils_1.jwtVerify)(token);
        const documentTitleExists = yield documentRepository.findByTitle(document.title, dataUser.id);
        if (documentTitleExists)
            throw (0, errorUtils_1.conflictError)(`title document exists`);
        const data = Object.assign(Object.assign({}, document), { userId: dataUser.id });
        yield documentRepository.insert(data);
    });
}
exports.createCard = createCard;
function removeDocument(id, token) {
    return __awaiter(this, void 0, void 0, function* () {
        const dataUser = yield (0, jwtUtils_1.jwtVerify)(token);
        const documentExists = yield documentRepository.findById(id);
        if (!documentExists)
            throw (0, errorUtils_1.notFoundError)(`no data in the database`);
        if (dataUser.id !== documentExists.userId)
            throw (0, errorUtils_1.unauthorizedError)(`this document does not belong to this user`);
        yield documentRepository.deleteDocument(id);
    });
}
exports.removeDocument = removeDocument;
function getDocument(id, token) {
    return __awaiter(this, void 0, void 0, function* () {
        const dataUser = yield (0, jwtUtils_1.jwtVerify)(token);
        const documentExists = yield documentRepository.findById(id);
        if (!documentExists)
            throw (0, errorUtils_1.notFoundError)(`no data in the databases`);
        if (dataUser.id !== documentExists.userId)
            throw (0, errorUtils_1.unauthorizedError)(`this document does not belong to this user`);
        const dateFormated = (0, dateUtils_1.formatDate)(documentExists.createdAt);
        const data = Object.assign(Object.assign({}, documentExists), { createdAt: dateFormated });
        return data;
    });
}
exports.getDocument = getDocument;
function getAllDocument(token) {
    return __awaiter(this, void 0, void 0, function* () {
        const dataUser = yield (0, jwtUtils_1.jwtVerify)(token);
        const result = yield documentRepository.findAll(dataUser.id);
        const data = result.map((document) => {
            return Object.assign(Object.assign({}, document), { createdAt: (0, dateUtils_1.formatDate)(document.createdAt) });
        });
        return data;
    });
}
exports.getAllDocument = getAllDocument;
//# sourceMappingURL=documentService.js.map