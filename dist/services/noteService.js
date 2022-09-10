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
exports.getAllNotes = exports.getNoteById = exports.removeNote = exports.createNote = void 0;
const errorUtils_1 = require("./../utils/errorUtils");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const noteRepository = __importStar(require("../repositories/noteRepository"));
const errorUtils_2 = require("../utils/errorUtils");
const jwtUtils_1 = require("../utils/jwtUtils");
function createNote(note, token) {
    return __awaiter(this, void 0, void 0, function* () {
        const noteExists = yield noteRepository.findByTitle(note.title);
        const dataUser = yield (0, jwtUtils_1.jwtVerify)(token);
        if (noteExists)
            throw (0, errorUtils_2.conflictError)(`note exixts`);
        const data = Object.assign(Object.assign({}, note), { userId: dataUser.id });
        yield noteRepository.insert(data);
    });
}
exports.createNote = createNote;
function removeNote(id, token) {
    return __awaiter(this, void 0, void 0, function* () {
        const dataUser = JSON.stringify(jsonwebtoken_1.default.verify(token, `${process.env.JWT_SECRETKEY}`));
        const parsedData = JSON.parse(dataUser);
        const noteExists = yield noteRepository.findById(id);
        if (!noteExists)
            throw (0, errorUtils_1.notFoundError)(`no data in the database`);
        if (parsedData.id !== noteExists.id)
            throw (0, errorUtils_1.unauthorizedError)(`this note does not belong to this user`);
        yield noteRepository.deleteNote(id);
    });
}
exports.removeNote = removeNote;
function getNoteById(id, token) {
    return __awaiter(this, void 0, void 0, function* () {
        const dataUser = yield (0, jwtUtils_1.jwtVerify)(token);
        const noteExists = yield noteRepository.findById(id);
        if (!noteExists)
            throw (0, errorUtils_1.notFoundError)(`no data in the database`);
        if (dataUser.id !== id)
            throw (0, errorUtils_1.unauthorizedError)(`this note does not belong to this user`);
        const result = yield noteRepository.findById(id);
        return result;
    });
}
exports.getNoteById = getNoteById;
function getAllNotes(token) {
    return __awaiter(this, void 0, void 0, function* () {
        const dataUser = yield (0, jwtUtils_1.jwtVerify)(token);
        const result = yield noteRepository.findAllNotes(dataUser.id);
        return result;
    });
}
exports.getAllNotes = getAllNotes;
//# sourceMappingURL=noteService.js.map