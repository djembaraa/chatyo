import { NextFunction, Response, Request } from "express";
import { CustomRequest } from "../types/CustomRequest";
import { groupFreeSchema, groupPaidSchema } from "../utils/schema/group";
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

    const group = await groupService.upsertFreeGroup(
      parse.data,
      req?.user?.id ?? "",
      req.file.filename
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

export const updateFreeGroup = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { groupId } = req.params;

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

    const group = await groupService.upsertFreeGroup(
      parse.data,
      req?.user?.id ?? "",
      req?.file?.filename,
      groupId
    );
    return res.json({
      success: true,
      message: "Update group successfully",
      data: group,
    });
  } catch (error) {
    next(error);
  }
};

export const createPaidGroup = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const parse = groupPaidSchema.safeParse(req.body);

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

    const files = req.files as {
      photo?: Express.Multer.File[];
      assets?: Express.Multer.File[];
    };

    // Validasi photo
    const photoFile = files.photo?.[0];
    if (!photoFile) {
      return res.status(400).json({
        success: false,
        message: "Photo is required",
      });
    }

    // Validasi assets
    const assetsFiles = files.assets;
    if (!assetsFiles || assetsFiles.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Assets is required",
      });
    }

    const assetsFilenames = assetsFiles.map((f) => f.filename);

    const group = await groupService.createPaidGroup(
      parse.data,
      photoFile.filename,
      req.user?.id ?? "",
      assetsFilenames
    );

    return res.json({
      success: true,
      message: "Group created successfully",
      data: group,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
