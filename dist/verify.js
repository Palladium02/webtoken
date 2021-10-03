"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
var sign_1 = require("./sign");
var isInPast = function (exp) {
    var now = new Date();
    return new Date(exp).setHours(0, 0, 0, 0) <= now.setHours(0, 0, 0, 0);
};
var verify = function (_a) {
    var token = _a.token, secret = _a.secret;
    var parts = token.split(".");
    if (parts.length !== 3)
        return new Error("Invalid token length");
    var encodedHeader = parts[0], encodedPayload = parts[1], signature = parts[2];
    var candidate = sign_1.createSignature({ encodedHeader: encodedHeader, encodedPayload: encodedPayload, secret: secret });
    if (signature !== candidate)
        return new Error("Invalid token.");
    var decodedPayload = _1.decode(token);
    if (isInPast(decodedPayload.exp)) {
        return new Error("Token has expired.");
    }
    return decodedPayload;
};
exports.default = verify;
