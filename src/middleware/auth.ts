import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import CustomError from "../errors/CustomError";

const authenticateJWT = (req: Request, _res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
      if (err) {
        console.log(err);
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

const refreshToken = (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token is required" });
  }

  jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET as string,
    (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Invalid refresh token" });
      }

      const newAccessToken = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET as string,
        { expiresIn: "1h" }
      );
      res.json({ accessToken: newAccessToken });
    }
  );
};

export { authenticateJWT, authorizeRoles, refreshToken };
