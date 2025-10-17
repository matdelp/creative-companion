import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "./authenticate";

export const demo = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const userId = req.userId;
  if (userId === -1) {
    res.status(401).send("Demo user not allowed to modify ressources");
    return;
  }
  next();
};
