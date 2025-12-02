import type { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export default function errorHandle(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errorCatch = error;
  console.log(error);
  if (error instanceof PrismaClientKnownRequestError) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
  return res.status(500).json({
    success: false,
    message: errorCatch?.message ?? "Internal Server Error",
  });
}
