import base64url from "base64url";

const decode = (token: string) => {
  let parts = token.split(".");
  if(parts.length !== 3) return new Error("Invalid token length.");
  let encodedPayload = parts[1];

  return JSON.parse(
    base64url.decode(encodedPayload).toString()
  )
}

export default decode;