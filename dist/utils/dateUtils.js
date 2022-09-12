"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDateNow = exports.formatDate = void 0;
const formatDate = (createAt) => {
    const date = createAt.getDate() +
        "/" +
        (Number(createAt.getMonth()) + 1) +
        "/" +
        createAt.getFullYear() +
        " " +
        createAt.getHours() +
        ":" +
        createAt.getMinutes() +
        ":" +
        createAt.getSeconds();
    return date;
};
exports.formatDate = formatDate;
const formatDateNow = (createAt) => {
    const date = Number(createAt.getDate()) +
        1 +
        "/" +
        (Number(createAt.getMonth()) + 1) +
        "/" +
        createAt.getFullYear() +
        " " +
        createAt.getHours() +
        ":" +
        createAt.getMinutes() +
        ":" +
        createAt.getSeconds();
    return date;
};
exports.formatDateNow = formatDateNow;
//# sourceMappingURL=dateUtils.js.map