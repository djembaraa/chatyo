import { Prisma, TransactionType, Transaction } from "@prisma/client";
import prisma from "../utils/prisma";

export const createTransaction = async (
  data: Prisma.TransactionCreateInput
) => {
  return prisma.transaction.create({ data });
};

export const updateTransaction = async (id: string, type: TransactionType) => {
  const transaction = await prisma.transaction.update({
    where: { id },
    data: {
      type,
    },
  });

  return transaction;
};

export const getMyTransactions = async (user_id: string) => {
  return await prisma.transaction.findMany({
    where: {
      owner_id: user_id,
    },
  });
};

export const getMyPayouts = async (user_id: string) => {
  return await prisma.payouts.findMany({
    where: {
      user_id: user_id,
    },
  });
};
