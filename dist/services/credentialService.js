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
exports.removeCredential = exports.getAllCredentials = exports.findCredentialById = exports.createCredential = void 0;
const passwordUtils_1 = require("./../utils/passwordUtils");
const errorUtils_1 = require("./../utils/errorUtils");
const credentialRepository = __importStar(require("../repositories/credentialRepository"));
const jwtUtils_1 = require("../utils/jwtUtils");
function createCredential(credential, token) {
    return __awaiter(this, void 0, void 0, function* () {
        const dataUser = yield (0, jwtUtils_1.jwtVerify)(token);
        const credentialTitleExists = yield credentialRepository.findByTitle(credential.title);
        if (credentialTitleExists)
            throw (0, errorUtils_1.conflictError)(`credential exists`);
        const encryptPassword = yield (0, passwordUtils_1.cryptPassword)(credential.password);
        const data = Object.assign(Object.assign({}, credential), { userId: dataUser.id, password: encryptPassword });
        yield credentialRepository.insert(data);
    });
}
exports.createCredential = createCredential;
function findCredentialById(id, token) {
    return __awaiter(this, void 0, void 0, function* () {
        const dataUser = yield (0, jwtUtils_1.jwtVerify)(token);
        const credentialExists = yield credentialRepository.findCredentialById(id);
        if (!credentialExists)
            throw (0, errorUtils_1.notFoundError)(`no data in the database`);
        if (dataUser.id !== credentialExists.userId)
            throw (0, errorUtils_1.unauthorizedError)(`this credential does not belong to this user`);
        const descryptPassword = (0, passwordUtils_1.decryptPassword)(credentialExists.password);
        const data = {
            title: credentialExists.title,
            url: credentialExists.url,
            userName: credentialExists.userName,
            password: descryptPassword,
            userId: credentialExists.userId,
            createdAt: credentialExists.createdAt,
        };
        return data;
    });
}
exports.findCredentialById = findCredentialById;
function getAllCredentials(token) {
    return __awaiter(this, void 0, void 0, function* () {
        const dataUser = yield (0, jwtUtils_1.jwtVerify)(token);
        const result = yield credentialRepository.findAllCredentials(dataUser.id);
        const data = result.map((credential) => {
            return Object.assign(Object.assign({}, credential), { password: (0, passwordUtils_1.decryptPassword)(credential.password) });
        });
        return data;
    });
}
exports.getAllCredentials = getAllCredentials;
function removeCredential(id, token) {
    return __awaiter(this, void 0, void 0, function* () {
        const dataUser = yield (0, jwtUtils_1.jwtVerify)(token);
        const credentialExists = yield credentialRepository.findCredentialById(id);
        if (!credentialExists)
            throw (0, errorUtils_1.notFoundError)(`no data in the database`);
        if (dataUser.id !== credentialExists.userId)
            throw (0, errorUtils_1.unauthorizedError)(`this credential does not belong to this user`);
        yield credentialRepository.deleteById(id);
    });
}
exports.removeCredential = removeCredential;
//# sourceMappingURL=credentialService.js.map