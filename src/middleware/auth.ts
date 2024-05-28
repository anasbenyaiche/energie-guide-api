import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import CustomError from "../errors/CustomError";

const authenticateJWT = (req: Request, _res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log(token);
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
      if (err) {
        return next(new CustomError("Unauthorized", 403));
      }
      //@ts-ignore
      req.user = user;
      next();
    });
  } else {
    next(new CustomError("Unauthorized", 403));
  }
};

const authorizeRoles = (roles: string[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    //@ts-ignore
    if (!roles.includes(req.user?.role)) {
      return next(new CustomError("Forbidden", 403));
    }
    next();
  };
};

export { authenticateJWT, authorizeRoles };
