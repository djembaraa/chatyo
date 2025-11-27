import express from "express";
import verifyToken from "../middleware/verifyToken";
import * as transactionsController from "../controllers/transactionsController";

const transactionsRoutes = express.Router();

transactionsRoutes.post(
  "/transactions",
  verifyToken,
  transactionsController.createTransactions
);

export default transactionsRoutes;
