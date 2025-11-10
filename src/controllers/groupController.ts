import { NextFunction, Response, Request } from "express";
import { CustomRequest } from "../types/CustomRequest";
import { groupFreeSchema } from "../utils/schema/group";

export const createGroup = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const parse = groupFreeSchema.safeParse(req.body);

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
  } catch (error) {
    next(error);
  }
};
