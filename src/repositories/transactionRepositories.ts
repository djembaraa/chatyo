import { Prisma, TransactionType, Transaction } from "@prisma/client";
import prisma from "../utils/prisma";
import { WithdrawValues } from "../utils/schema/transactions";

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
    include: {
      user: {
        select: {
          name: true,
          photo_url: true,
        },
      },
      group: {
        select: {
          name: true,
          photo_url: true,
        },
      },
    },
  });
};

export const getMyPayouts = async (user_id: string) => {
  return await prisma.payouts.findMany({
    where: {
      user_id: user_id,
    },
    orderBy: {
      created_at: "desc",
    },
  });
};

export const createWithdraw = async (data: WithdrawValues, user_id: string) => {
  return await prisma.payouts.create({
    data: {
      amount: data.amount,
      bank_name: data.bank_name,
      bank_account_name: data.bank_account_name,
      bank_account_number: data.bank_account_number.toString(),
      user_id: user_id,
      status: "PENDING",
    },
  });
};
