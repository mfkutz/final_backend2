import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

export function generateToken(payload) {
  const token = jwt.sign(payload, config.JWT_SECRET, {
    expiresIn: "30m",
  });
  return token;
}

export function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error(`Invalid token: ${error}`);
  }
}
