import { Prisma } from "@prisma/client";
import prisma from "../utils/prisma";

export const createTransaction = async (
  data: Prisma.TransactionCreateInput
) => {
  return prisma.transaction.create({ data });
};
