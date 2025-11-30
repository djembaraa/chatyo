import prisma from "../utils/prisma";
import { CreateMessageValues } from "../utils/schema/chat";
import * as userRepository from "./userRepositories";

export const createRoomPersonal = async (
  sender_id: string,
  receiver_id: string
) => {
  const room = await prisma.room.findFirst({
    where: {
      member: {
        every: {
          user_id: {
            in: [sender_id, receiver_id],
          },
        },
      },
      is_group: false,
    },
  });

  const owner = await userRepository.findRole("OWNER");
  const member = await userRepository.findRole("MEMBER");

  return await prisma.room.upsert({
    where: {
      id: room?.id ?? "0",
    },
    create: {
      created_by: sender_id,
      is_group: false,
      name: "",
      member: {
        createMany: {
          data: [
            { user_id: sender_id, role_id: owner.id },
            { user_id: receiver_id, role_id: member.id },
          ],
        },
      },
    },
    update: {},
  });
};

export const getRooms = async (userId: string) => {
  return await prisma.room.findMany({
    where: {
      member: {
        some: {
          user_id: userId,
        },
      },
    },
    include: {
      messages: {
        select: {
          content: true,
          user: {
            select: {
              name: true,
              photo_url: true,
            },
          },
        },
        take: 1,
        orderBy: {
          created_at: "desc",
        },
      },
      member: {
        select: {
          user: {
            select: {
              name: true,
              photo_url: true,
            },
          },
        },
        where: {
          role: {
            role: "MEMBER",
          },
        },
      },
      group: {
        select: {
          name: true,
          photo_url: true,
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });
};

export const getRoomsMessages = async (roomId: string) => {
  return await prisma.room.findFirst({
    where: {
      id: roomId,
    },
    select: {
      id: true,
      is_group: true,
      messages: {
        select: {
          content: true,
          type: true,
          user: {
            select: {
              id: true,
              name: true,
              photo_url: true,
            },
          },
          created_at: true,
        },
        orderBy: {
          created_at: "asc",
        },
      },
      group: {
        select: {
          name: true,
          photo_url: true,
        },
      },
      member: {
        select: {
          user: {
            select: {
              id: true,
              name: true,
              photo_url: true,
            },
          },
        },
      },
    },
  });
};

export const findRoomsById = async (room_id: string) => {
  return await prisma.room.findFirstOrThrow({
    where: {
      id: room_id,
    },
  });
};

export const findMember = async (userId: string, roomId: string) => {
  return await prisma.roomMember.findFirst({
    where: {
      room_id: roomId,
      user_id: userId,
    },
  });
};

export const createMessage = async (
  data: CreateMessageValues,
  userId: string,
  file: Express.Multer.File | undefined
) => {
  return await prisma.roomMessage.create({
    data: {
      user_id: userId, //Pakai user_id karena di schema ga ada sender_id tidak seperti di course
      room_id: data.room_id,
      content: file ? file.filename : data.message,
      type: file ? "IMAGE" : "TEXT",
    },
  });
};
