import { NextFunction, Response } from "express";
import { CustomRequest } from "../types/CustomRequest";
import { joinPaidGroup } from "../utils/schema/group";
import * as transactionService from "../services/transactionServices";
import { withdrawSchema } from "../utils/schema/transactions";

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

export const getRevenueStat = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await transactionService.getRevenueStat(req?.user?.id ?? "");
    return res.json({
      success: true,
      message: "Revenue statistics retrieved successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getHistoryPayouts = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await transactionService.getHistoryPayouts(
      req?.user?.id ?? ""
    );
    return res.json({
      success: true,
      message: "Payout history retrieved successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getBalance = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await transactionService.getBalance(req?.user?.id ?? "");
    return res.json({
      success: true,
      message: "Balance retrieved successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const createWithdraw = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const parse = withdrawSchema.safeParse(req.body);

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

    const data = await transactionService.createWithdraw(
      parse.data,
      req?.user?.id ?? ""
    );

    return res.json({
      success: true,
      message: "Withdraw request created successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};
