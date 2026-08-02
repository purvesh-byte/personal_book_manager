import jwt from "jsonwebtoken";

export interface JwtPayload {
  userId: string;
  email: string;
}

export function verifyToken(token: string): JwtPayload | null {
  const JWT_SECRET = process.env.JWT_SECRET;

  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch {
    return null;
  }
}