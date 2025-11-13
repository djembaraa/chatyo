import prisma from "../utils/prisma";
import { GroupFreeValues, GroupPaidValues } from "../utils/schema/group";
import * as userRepositories from "./userRepositories";

export const findGroupById = async (id: string) => {
  return await prisma.group.findFirstOrThrow({
    where: {
      id: id,
    },
  });
};

export const getDiscoverGroups = async (name = "") => {
  return await prisma.group.findMany({
    where: {
      name: {
        contains: name,
        mode: "insensitive",
      },
    },
    select: {
      photo_url: true,
      id: true,
      name: true,
      about: true,
      type: true,
      room: {
        select: {
          _count: {
            select: {
              member: true,
            },
          },
        },
      },
    },
  });
};

export const getDiscoverPeople = async (name = "", userId?: string) => {
  return await prisma.user.findMany({
    where: {
      id: {
        not: userId,
      },
      name: {
        contains: name,
        mode: "insensitive",
      },
    },
    select: {
      id: true,
      name: true,
      photo_url: true,
    },
  });
};

export const upsertFreeGroup = async (
  data: GroupFreeValues,
  userId: string,
  photo?: string,
  groupId?: string
) => {
  const owner = await userRepositories.findRole("OWNER");

  return await prisma.group.upsert({
    where: {
      id: groupId ?? "",
    },
    create: {
      photo: photo ?? "",
      name: data.name,
      about: data.about,
      price: 0,
      type: "FREE",
      room: {
        create: {
          created_by: userId,
          name: data.name,
          member: {
            create: {
              user_id: userId,
              role_id: owner.id,
            },
          },
          is_group: true,
        },
      },
    },
    update: {
      photo: photo,
      name: data.name,
      about: data.about,
    },
  });
};

export const upsertPaidGroup = async (
  data: GroupPaidValues,
  userId: string,
  photo?: string,
  assets?: string[],
  groupId?: string
) => {
  const owner = await userRepositories.findRole("OWNER");

  const group = await prisma.group.upsert({
    where: {
      id: groupId ?? "",
    },
    create: {
      photo: photo ?? "",
      name: data.name,
      about: data.about,
      price: Number(data.price),
      benefit: data.benefits,
      type: "PAID",
      room: {
        create: {
          created_by: userId,
          name: data.name,
          member: {
            create: {
              user_id: userId,
              role_id: owner.id,
            },
          },
          is_group: true,
        },
      },
    },
    update: {
      photo: photo,
      name: data.name,
      about: data.about,
      price: Number(data.price),
      benefit: data.benefits,
      type: "PAID",
    },
  });

  if (assets) {
    for (const asset of assets) {
      await prisma.groupAssets.create({
        data: {
          filename: asset,
          group_id: group.id,
        },
      });
    }
  }

  return group;
};

export const findDetailGroup = async (id: string, userId: string) => {
  return await prisma.group.findFirstOrThrow({
    where: {
      id: id,
      room: {
        created_by: userId,
      },
    },
    select: {
      id: true,
      name: true,
      about: true,
      photo_url: true,
      type: true,
      assets: {
        select: {
          filename: true,
        },
      },
      room: {
        select: {
          member: {
            take: 1,
            where: {
              user_id: userId,
            },
            select: {
              user: {
                select: {
                  name: true,
                  photo_url: true,
                },
              },
            },
          },
          _count: {
            select: {
              member: true,
            },
          },
        },
      },
    },
  });
};
