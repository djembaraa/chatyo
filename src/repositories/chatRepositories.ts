import prisma from "../utils/prisma";
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
