import { u } from "framer-motion/client";
import * as groupRepositories from "../repositories/groupRepositories";
import * as transactionRepositories from "../repositories/transactionRepositories";
import * as userRepositories from "../repositories/userRepositories";
import { WithdrawValues } from "../utils/schema/transactions";
import { th } from "zod/locales";

console.log("MIDTRANS:", process.env.MIDTRANS_TRANSACTION_URL);

export const createTransaction = async (groupId: string, userId: string) => {
  const checkMember = await groupRepositories.getMemberById(userId, groupId);

  if (checkMember) {
    throw new Error("You already in this group");
  }

  const group = await groupRepositories.findGroupById(groupId);

  if (group.type === "FREE") {
    throw new Error("This group is free");
  }

  const user = await userRepositories.getUserById(userId);

  const transaction = await transactionRepositories.createTransaction({
    price: group.price,
    owner: {
      connect: {
        id: group.room.member[0].user_id,
      },
    },
    user: {
      connect: {
        id: userId,
      },
    },
    type: "PENDING",
    group: {
      connect: { id: groupId },
    },
  });

  const midtransUrl = process.env.MIDTRANS_TRANSACTION_URL ?? "";
  const midtransAuth = process.env.MIDTRANS_AUTH_STRING ?? "";

  const midtransResponse = await fetch(midtransUrl, {
    method: "POST",
    body: JSON.stringify({
      transaction_details: {
        order_id: transaction.id,
        gross_amount: transaction.price,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        email: user.email,
      },
    }),
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Basic ${midtransAuth}`,
    },
  });
  const midtransJson = await midtransResponse.json();

  return midtransJson;
};

export const updateTransaction = async (order_id: string, status: string) => {
  switch (status) {
    case "capture":
    case "settlement": {
      const transaction = await transactionRepositories.updateTransaction(
        order_id,
        "SUCCESS"
      );

      const group = await groupRepositories.findGroupById(transaction.group_id);

      await groupRepositories.addMemberToGroup(
        group.room_id,
        transaction.user_id
      );

      return {
        transaction_id: transaction.id,
      };
    }
    case "deny":
    case "expire":
    case "failure": {
      const transaction = await transactionRepositories.updateTransaction(
        order_id,
        "FAILED"
      );
      return transaction.id;
    }

    default:
      return {};
  }
};

export const getBalance = async (user_id: string) => {
  const transaction = await transactionRepositories.getMyTransactions(user_id);
  const payouts = await transactionRepositories.getMyPayouts(user_id);

  const totalRevenue = transaction.reduce((acc, curr) => {
    if (curr.type === "SUCCESS") {
      return acc + curr.price;
    }

    return acc;
  }, 0);

  const totalPayouts = payouts.reduce((acc, curr) => acc + curr.amount, 0);

  return totalRevenue - totalPayouts;
};

export const getRevenueStat = async (user_id: string) => {
  const transaction = await transactionRepositories.getMyTransactions(user_id);
  const payouts = await transactionRepositories.getMyPayouts(user_id);
  const group = await groupRepositories.getMyOwnGroup(user_id);

  const totalRevenue = transaction.reduce((acc, curr) => {
    if (curr.type === "SUCCESS") {
      return acc + curr.price;
    }

    return acc;
  }, 0);

  const totalPayouts = payouts.reduce((acc, curr) => acc + curr.amount, 0);

  const balance = totalRevenue - totalPayouts;

  const totalVipGroups = group.filter((group) => group.type === "PAID").length;

  const totalVipMembers = group.reduce((acc, curr) => {
    if (curr.type === "PAID") {
      return acc + (curr?.room?._count?.member ?? 0);
    }

    return acc;
  }, 0);

  const latestMemberVip = transaction.filter(
    (transaction) => transaction.type === "SUCCESS"
  );

  return {
    balance,
    total_vip_groups: totalVipGroups,
    total_vip_members: totalVipMembers,
    total_revenue: totalRevenue,
    latest_member: latestMemberVip,
  };
};

export const getHistoryPayouts = async (user_id: string) => {
  return await transactionRepositories.getMyPayouts(user_id);
};

export const createWithdraw = async (data: WithdrawValues, user_id: string) => {
  const balance = await getBalance(user_id);

  if (balance < data.amount) {
    throw new Error("Insufficient balance for withdrawal");
  }

  return await transactionRepositories.createWithdraw(data, user_id);
};
