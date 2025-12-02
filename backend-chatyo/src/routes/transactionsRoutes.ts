import express from "express";
import verifyToken from "../middleware/verifyToken";
import * as transactionsController from "../controllers/transactionsController";

const transactionsRoutes = express.Router();

transactionsRoutes.post(
  "/transactions",
  verifyToken,
  transactionsController.createTransactions
);

transactionsRoutes.post(
  "/transactions/handle-payment",
  transactionsController.updateTransactions
);

transactionsRoutes.get(
  "/revenue",
  verifyToken,
  transactionsController.getRevenueStat
);

transactionsRoutes.get(
  "/payouts",
  verifyToken,
  transactionsController.getHistoryPayouts
);

transactionsRoutes.post(
  "/payouts",
  verifyToken,
  transactionsController.createWithdraw
);

transactionsRoutes.get(
  "/balance",
  verifyToken,
  transactionsController.getBalance
);

export default transactionsRoutes;
