import { NextFunction, Request, Response } from "express";
import { signUpSchema } from "../utils/schema/user";
import fs from "node:fs";
import * as userService from "../services/userServices";
import { success } from "zod";
import { m } from "framer-motion";
import { data } from "autoprefixer";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Profile picture is required",
      });
    }

    const parse = signUpSchema.safeParse(req.body);
    if (!parse.success) {
      const errorMessage = parse.error.issues.map(
        (err) => `${err.path} - ${err.message}`
      );

      fs.unlinkSync(req.file.path);

      return res.status(400).json({
        success: false,
        message: "Validation errors",
        detail: errorMessage,
      });
    }

    const newUser = await userService.signUp(parse.data, req.file);
    return res.json({
      success: true,
      message: "User registered successfully",
      data: newUser,
    });
  } catch (error) {}
};
