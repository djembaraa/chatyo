import { NextFunction } from "express";
import { CustomRequest } from "../types/CustomRequest";
import { Response } from "express";

import * as chatService from "../services/chatServices";
import { createRoomPersonalSchema } from "../utils/schema/chat";

export const createRoomPersonal = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const parse = createRoomPersonalSchema.safeParse(req.body);

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

    const data = await chatService.createRoomPersonal(
      req?.user?.id ?? "",
      parse.data.user_id
    );

    return res.json({
      success: true,
      message: "Successfully created personal chat room",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getRooms = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await chatService.getRecentRooms(req?.user?.id ?? "");

    return res.json({
      success: true,
      message: "Successfully retrieved chat rooms",
      data,
    });
  } catch (error) {
    next(error);
  }
};
