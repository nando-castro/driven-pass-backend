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
exports.getAllCards = exports.getCard = exports.removeCard = exports.createCard = void 0;
const dateUtils_1 = require("./../utils/dateUtils");
const jwtUtils_1 = require("../utils/jwtUtils");
const cardRepository = __importStar(require("../repositories/cardRepository"));
const errorUtils_1 = require("../utils/errorUtils");
const passwordUtils_1 = require("../utils/passwordUtils");
function createCard(card, token) {
    return __awaiter(this, void 0, void 0, function* () {
        const dataUser = yield (0, jwtUtils_1.jwtVerify)(token);
        const cardTitleExists = yield cardRepository.findByTitle(card.title, dataUser.id);
        if (cardTitleExists)
            throw (0, errorUtils_1.conflictError)(`title card exists`);
        const encryptNumberCard = yield (0, passwordUtils_1.cryptPassword)(card.numero);
        const encryptPassword = yield (0, passwordUtils_1.cryptPassword)(card.password);
        const encryptCode = yield (0, passwordUtils_1.cryptPassword)(card.securityCode);
        const data = Object.assign(Object.assign({}, card), { numero: encryptNumberCard, password: encryptPassword, securityCode: encryptCode, userId: dataUser.id });
        yield cardRepository.insert(data);
    });
}
exports.createCard = createCard;
function removeCard(id, token) {
    return __awaiter(this, void 0, void 0, function* () {
        const dataUser = yield (0, jwtUtils_1.jwtVerify)(token);
        const cardExists = yield cardRepository.findById(id);
        if (!cardExists)
            throw (0, errorUtils_1.notFoundError)(`no data in the database`);
        if (dataUser.id !== cardExists.userId)
            throw (0, errorUtils_1.unauthorizedError)(`this card does not belong to this user`);
        yield cardRepository.deleteCard(id);
    });
}
exports.removeCard = removeCard;
function getCard(id, token) {
    return __awaiter(this, void 0, void 0, function* () {
        const dataUser = yield (0, jwtUtils_1.jwtVerify)(token);
        const cardExists = yield cardRepository.findById(id);
        if (!cardExists)
            throw (0, errorUtils_1.notFoundError)(`no data in the databases`);
        if (dataUser.id !== cardExists.userId)
            throw (0, errorUtils_1.unauthorizedError)(`this card does not belong to this user`);
        const descryptNumberCard = (0, passwordUtils_1.decryptPassword)(cardExists.numero);
        const descryptPassword = (0, passwordUtils_1.decryptPassword)(cardExists.password);
        const descryptCode = (0, passwordUtils_1.decryptPassword)(cardExists.securityCode);
        const dateFormated = (0, dateUtils_1.formatDate)(cardExists.createdAt);
        const data = {
            id: cardExists.id,
            title: cardExists.title,
            userId: cardExists.userId,
            numberCard: descryptNumberCard,
            cardHolderName: cardExists.cardholderName,
            password: descryptPassword,
            securityCode: descryptCode,
            expirationDate: cardExists.expirationDate,
            isVirtual: cardExists.isVirtual,
            type: cardExists.type,
            createAt: dateFormated,
        };
        return data;
    });
}
exports.getCard = getCard;
function getAllCards(token) {
    return __awaiter(this, void 0, void 0, function* () {
        const dataUser = yield (0, jwtUtils_1.jwtVerify)(token);
        const result = yield cardRepository.findAll(dataUser.id);
        const data = result.map((card) => {
            return Object.assign(Object.assign({}, card), { numero: (0, passwordUtils_1.decryptPassword)(card.numero), securityCode: (0, passwordUtils_1.decryptPassword)(card.securityCode), password: (0, passwordUtils_1.decryptPassword)(card.password), createdAt: (0, dateUtils_1.formatDate)(card.createdAt) });
        });
        return data;
    });
}
exports.getAllCards = getAllCards;
//# sourceMappingURL=cardService.js.map