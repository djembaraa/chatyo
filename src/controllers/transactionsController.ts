import { NextFunction, Response } from "express";
import { CustomRequest } from "../types/CustomRequest";
import { joinPaidGroup } from "../utils/schema/group";
import * as transactionService from "../services/transactionServices";

export const createTransactions = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const parse = joinPaidGroup.safeParse(req.body);

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

    const data = await transactionService.createTransaction(
      parse.data.groupId,
      req?.user?.id ?? ""
    );

    return res.json({
      success: true,
      message: "Transaction created successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTransactions = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await transactionService.updateTransaction(
      req.body.order_id,
      req.body.transaction_status
    );
    return res.json({
      success: true,
      message: "Transaction updated successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};
