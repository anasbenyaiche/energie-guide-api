import { Request, Response, NextFunction } from "express";
import CustomError from "../errors/CustomError";

const errorHandler = (
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({ message });
};

export default errorHandler;
