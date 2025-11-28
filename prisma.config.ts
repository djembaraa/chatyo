// prisma.config.ts
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  // kalau schema kamu di prisma/schema.prisma
  schema: "prisma/schema.prisma",

  // di sinilah sekarang Prisma CLI (migrate, studio, dll) baca DATABASE_URL
  datasource: {
    url: env("DATABASE_URL"),
  },
});
