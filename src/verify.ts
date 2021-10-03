import { decode } from ".";
import { createSignature } from "./sign";

interface Verify {
  token: string,
  secret: string
}

const isInPast = (exp: number) => {
  let now = new Date();
  return new Date(exp).setHours(0, 0, 0, 0) <= now.setHours( 0, 0, 0, 0);
}

const verify = ({ token, secret }: Verify) => {
  let parts = token.split(".");

  if(parts.length !== 3) return new Error("Invalid token length");
  
  let [encodedHeader, encodedPayload, signature] = parts;

  let candidate = createSignature({ encodedHeader, encodedPayload, secret });

  if(signature !== candidate) return new Error("Invalid token.");

  let decodedPayload = decode(token);
  if(isInPast(decodedPayload.exp)) {
    return new Error("Token has expired.");
  }

  return decodedPayload;
}

export default verify;