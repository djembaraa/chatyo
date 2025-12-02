import { NextFunction, Response } from "express";
import { CustomRequest } from "../types/CustomRequest";
import jwt from "jsonwebtoken";
import * as userRepositories from "../repositories/userRepositories";

export default async function verifyToken(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  const authorization = req.headers.authorization;

  // Cek token ada atau tidak
  if (!authorization) {
    return res.status(401).json({
      success: false,
      message: "No token provided",
    });
  }

  // Format: JWT <token>
  const [scheme, token] = authorization.split(" ");

  if (scheme !== "JWT" || !token) {
    return res.status(401).json({
      success: false,
      message: "Invalid token format, expected: JWT <token>",
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.SECRET_AUTH ?? "") as {
      id: string;
    };

    // Ambil user dari database
    const user = await userRepositories.getUserById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role.role,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
}
