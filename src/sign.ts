import crypto from "crypto";
import base64url from "base64url";

interface Sign {
  payload: object,
  secret: string,
  options?: object
}

interface Signature {
  encodedHeader: string,
  encodedPayload: string,
  secret: string
}

const DEFAULT_OPTIONS = {
  expiresIn: 8.64e7
}

const createSignature = ({ encodedHeader, encodedPayload, secret }: Signature) => {
  let signature = crypto.createHmac("SHA256", secret);
  let intermediate = signature
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest("base64");

  return base64url.fromBase64(intermediate);
}

const sign = ({ payload, secret, options }: Sign) => {
  const mergedOptions = {...DEFAULT_OPTIONS, ...options};

  const header = {
    alg: "HS256",
    typ: "JWT"
  };
  let encodedHeader = base64url.encode(JSON.stringify(header));

  const now = Date.now();
  let expiresIn = now + mergedOptions.expiresIn;
  
  let encodedPayload = base64url.encode(JSON.stringify({
    ...payload,
    exp: expiresIn
  }));

  let signature = createSignature({ encodedHeader, encodedPayload, secret });

  return [encodedHeader, encodedPayload, signature].join(".");
}

export {
  sign,
  createSignature
};