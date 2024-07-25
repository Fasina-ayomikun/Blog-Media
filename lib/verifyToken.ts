import { headers } from "next/headers";
import { JwtPayload } from "./types";
import jwt from "jsonwebtoken";

export const verifyToken = () => {
  const headersList = headers();
  let token = headersList.get("authorization");
  if (!token) {
    return null; // Or throw an error if missing token is a critical issue
  }
  const tokenParts = token.split(" ");
  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    return null; // Or throw a specific error for invalid token format
  }
  const actualToken = tokenParts[1];

  const decoded = jwt.verify(actualToken, "JWT_SECRET") as JwtPayload;
  return decoded;
};
