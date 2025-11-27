import { NextFunction, Response, Request } from "express";
import { CustomRequest } from "../types/CustomRequest";
import {
  groupFreeSchema,
  groupPaidSchema,
  joinFreeGroup,
} from "../utils/schema/group";
import * as groupService from "../services/groupServices";
import { success } from "zod";

export const getDiscoverGroups = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.query;

    const data = await groupService.getDiscoverGroups((name as string) ?? "");
    return res.json({
      success: true,
      message: "Get discover groups successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getOwnGroup = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await groupService.getMyOwnGroup(req.user?.id ?? "");
    return res.json({
      success: true,
      message: "Get my own groups successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getDiscoverPeople = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.query;

    const data = await groupService.getDiscoverPeople(
      name as string,
      req?.user?.id
    );

    return res.json({
      success: true,
      message: "Get discover people successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const findDetailGroup = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.query;

    const data = await groupService.findDetailGroup(
      id as string,
      req.user?.id ?? ""
    );

    return res.json({
      success: true,
      message: "Get detail group successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

// Opsi lain ketika error dilempar not found
// export const getDetailGroup = async (req: CustomRequest, res: Response) => {
//   try {
//     const { id } = req.params;

//     const data = await groupService.findDetailGroup(id, req.user.id);

//     return res.json({
//       success: true,
//       message: "Get detail group successfully",
//       data,
//     });
//   } catch (error) {
//     return res.status(404).json({
//       success: false,
//       message: "Group not found",
//     });
//   }
// };

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

    const group = await groupService.upsertPaidGroup(
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

export const updatePaidGroup = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { groupId } = req.params;
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

    // Validasi assets
    const assetsFiles = files.assets;

    const assetsFilenames = assetsFiles?.map((f) => f.filename);

    const group = await groupService.upsertPaidGroup(
      parse.data,
      req.user?.id ?? "",
      photoFile?.filename,
      assetsFilenames,
      groupId
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

export const createMemberFreeGroup = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const parse = joinFreeGroup.safeParse(req.body);

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

    const data = await groupService.addMemberFreeGroup(
      parse.data.group_id,
      req?.user?.id ?? ""
    );

    return res.json({
      success: true,
      message: "Join free group successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};
