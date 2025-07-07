import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload as JwtPayloadBase } from "jsonwebtoken";

type JwtPayload = {
  id: string;
  email: string;
  iat?: number;
  exp?: number;
};

export interface AuthenticatedRequest extends Request {
  userId?: number;
  email?: string;
}

export const auth = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JwtPayloadBase & JwtPayload;
    req.userId = Number(decoded.id);
    req.email = decoded.email;
    next();
  } catch (err) {
    console.error("JWT verification failed:", err);
    res.status(401).json({ message: "Invalid token" });
  }
};
