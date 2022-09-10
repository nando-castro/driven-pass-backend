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
exports.removeCredential = exports.getAllCredentials = exports.getCredential = exports.createCredential = void 0;
const credentialService = __importStar(require("../services/credentialService"));
function createCredential(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const credential = req.body;
        const { token } = res.locals;
        yield credentialService.createCredential(credential, token);
        res.status(200).send(`credential add sucessfull`);
    });
}
exports.createCredential = createCredential;
function getCredential(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { token } = res.locals;
        const { id } = req.params;
        const result = yield credentialService.findCredentialById(Number(id), token);
        res.status(200).send(result);
    });
}
exports.getCredential = getCredential;
function getAllCredentials(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { token } = res.locals;
        const result = yield credentialService.getAllCredentials(token);
        res.status(200).send(result);
    });
}
exports.getAllCredentials = getAllCredentials;
function removeCredential(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { token } = res.locals;
        const { id } = req.params;
        yield credentialService.removeCredential(Number(id), token);
        res.status(200).send(`delete credential sucessfull`);
    });
}
exports.removeCredential = removeCredential;
//# sourceMappingURL=credentialController.js.map