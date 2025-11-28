import { PrismaClient } from "@prisma/client";

const baseClient = new PrismaClient();

const prisma = baseClient.$extends({
  result: {
    user: {
      photo_url: {
        needs: { photo: true },
        compute(data: { photo: string | null }) {
          if (data.photo) {
            return `${process.env.URL_ASSET_PHOTO}${data.photo}`;
          }
          return null;
        },
      },
    },
    group: {
      photo_url: {
        needs: { photo: true },
        compute(data: { photo: string | null }) {
          if (data.photo) {
            return `${process.env.URL_ASSET_GROUP_PHOTO}${data.photo}`;
          }
          return null;
        },
      },
    },
  },
});

export default prisma;
