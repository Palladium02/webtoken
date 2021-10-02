"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var base64url_1 = __importDefault(require("base64url"));
var decode = function (token) {
    var parts = token.split(".");
    if (parts.length !== 3)
        return new Error("Invalid token");
    var encodedPayload = parts[1];
    return JSON.parse(base64url_1.default.decode(encodedPayload).toString());
};
exports.default = decode;
