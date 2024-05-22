import { Request, Response, NextFunction } from "express";
import * as authService from "../services/authService";
import CustomError from "../errors/CustomError";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body;
    const { user, token } = await authService.login(username, password);

    res.json({ user, token });
  } catch (err) {
    next(new CustomError("Invalid credentials", 401));
  }
};

// New function to create admin user
export const createAdminUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body;
    await authService.createAdminUser(username, password);
    res.status(201).json({ message: "Admin user created successfully" });
  } catch (err) {
    next(new CustomError(err.message, 400));
  }
};
