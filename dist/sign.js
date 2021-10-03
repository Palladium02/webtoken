"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSignature = exports.sign = void 0;
var crypto_1 = __importDefault(require("crypto"));
var base64url_1 = __importDefault(require("base64url"));
var DEFAULT_OPTIONS = {
    expiresIn: 8.64e7
};
var createSignature = function (_a) {
    var encodedHeader = _a.encodedHeader, encodedPayload = _a.encodedPayload, secret = _a.secret;
    var signature = crypto_1.default.createHmac("SHA256", secret);
    var intermediate = signature
        .update(encodedHeader + "." + encodedPayload)
        .digest("base64");
    return base64url_1.default.fromBase64(intermediate);
};
exports.createSignature = createSignature;
var sign = function (_a) {
    var payload = _a.payload, secret = _a.secret, options = _a.options;
    var mergedOptions = __assign(__assign({}, DEFAULT_OPTIONS), options);
    var header = {
        alg: "HS256",
        typ: "JWT"
    };
    var encodedHeader = base64url_1.default.encode(JSON.stringify(header));
    var now = Date.now();
    var expiresIn = now + mergedOptions.expiresIn;
    var encodedPayload = base64url_1.default.encode(JSON.stringify(__assign(__assign({}, payload), { exp: expiresIn })));
    var signature = createSignature({ encodedHeader: encodedHeader, encodedPayload: encodedPayload, secret: secret });
    return [encodedHeader, encodedPayload, signature].join(".");
};
exports.sign = sign;
