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
exports.getNetworks = exports.getNetworkById = exports.removeNetwork = exports.createNetwork = void 0;
const passwordUtils_1 = require("./../utils/passwordUtils");
const errorUtils_1 = require("./../utils/errorUtils");
const jwtUtils_1 = require("./../utils/jwtUtils");
const networkRepository = __importStar(require("../repositories/networkRepository"));
function createNetwork(network, token) {
    return __awaiter(this, void 0, void 0, function* () {
        const dataUser = yield (0, jwtUtils_1.jwtVerify)(token);
        const networkTitleExists = yield networkRepository.findByTitle(network.title);
        if (networkTitleExists)
            throw (0, errorUtils_1.conflictError)(`network title exists`);
        const encryptPassword = yield (0, passwordUtils_1.cryptPassword)(network.password);
        const data = {
            userId: dataUser.id,
            title: network.title,
            name: network.name,
            password: encryptPassword,
        };
        yield networkRepository.insert(data);
    });
}
exports.createNetwork = createNetwork;
function removeNetwork(id, token) {
    return __awaiter(this, void 0, void 0, function* () {
        const dataUser = yield (0, jwtUtils_1.jwtVerify)(token);
        const networkExists = yield networkRepository.findById(id);
        if (!networkExists)
            throw (0, errorUtils_1.notFoundError)(`no data in the database`);
        if (dataUser.id !== networkExists.userId)
            throw (0, errorUtils_1.unauthorizedError)(`this network does not belong to this user`);
        yield networkRepository.deleteNetwork(id);
    });
}
exports.removeNetwork = removeNetwork;
function getNetworkById(id, token) {
    return __awaiter(this, void 0, void 0, function* () {
        const dataUser = yield (0, jwtUtils_1.jwtVerify)(token);
        const networkExists = yield networkRepository.findById(id);
        if (dataUser.id !== id)
            throw (0, errorUtils_1.unauthorizedError)(`this network does not belong to this user`);
        if (!networkExists)
            throw (0, errorUtils_1.notFoundError)(`no data in the databases`);
        const descryptPassword = yield (0, passwordUtils_1.decryptPassword)(networkExists.password);
        const data = {
            id: networkExists.id,
            title: networkExists.title,
            userId: networkExists.userId,
            name: networkExists.name,
            password: descryptPassword,
            createAt: networkExists.createdAt,
        };
        return data;
    });
}
exports.getNetworkById = getNetworkById;
function getNetworks(token) {
    return __awaiter(this, void 0, void 0, function* () {
        const dataUser = yield (0, jwtUtils_1.jwtVerify)(token);
        const result = yield networkRepository.findAll(dataUser.id);
        const data = result.map((network) => {
            return Object.assign(Object.assign({}, network), { password: (0, passwordUtils_1.decryptPassword)(network.password) });
        });
        return data;
    });
}
exports.getNetworks = getNetworks;
//# sourceMappingURL=networkService.js.map