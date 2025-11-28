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
