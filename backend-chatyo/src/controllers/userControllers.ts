import { NextFunction, Request, Response } from "express";
import { resetPasswordSchema, signUpSchema } from "../utils/schema/user";
import { signInSchema } from "../utils/schema/user";
import fs from "node:fs";
import * as userService from "../services/userServices";
import { sign } from "node:crypto";
import { success } from "zod";

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

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const parse = signInSchema.safeParse(req.body);

    if (!parse.success) {
      const errorMessage = parse.error.issues.map(
        (err) => `${err.path} - ${err.message}`
      );

      return res.status(400).json({
        success: false,
        message: "Validation errors",
        detail: errorMessage,
      });
    }

    const data = await userService.signIn(parse.data);

    return res.json({
      success: true,
      message: "User signed in successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getEmailReset = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const parse = signInSchema.pick({ email: true }).safeParse(req.body);

    if (!parse.success) {
      const errorMessage = parse.error.issues.map(
        (err) => `${err.path} - ${err.message}`
      );

      return res.status(400).json({
        success: false,
        message: "Validation errors",
        detail: errorMessage,
      });
    }

    await userService.getEmailReset(parse.data.email);

    return res.json({
      success: true,
      message: "Password reset email sent successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const updatePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const parse = resetPasswordSchema.safeParse(req.body);

    if (!parse.success) {
      const errorMessage = parse.error.issues.map(
        (err) => `${err.path} - ${err.message}`
      );

      return res.status(400).json({
        success: false,
        message: "Validation errors",
        detail: errorMessage,
      });
    }

    const { tokenId } = req.params;

    await userService.updatePassword(parse.data, tokenId);

    return res.json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    next(error);
  }
};
