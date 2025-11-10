import { NextFunction, Response, Request } from "express";
import { CustomRequest } from "../types/CustomRequest";
import { groupFreeSchema } from "../utils/schema/group";
import * as groupService from "../services/groupServices";

export const createFreeGroup = async (
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

    if (!req.file) {
      return res.status(400).json({
        success: true,
        message: "Photo is required",
      });
    }

    const group = await groupService.createFreeGroup(
      parse.data,
      req.file.filename,
      req?.user?.id ?? ""
    );
    return res.json({
      success: true,
      message: "Group created successfully",
      data: group,
    });
  } catch (error) {
    next(error);
  }
};
