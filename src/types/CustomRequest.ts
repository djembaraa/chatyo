import { Request } from "express"; // <- WAJIB IMPORT INI

import { RoleType } from "@prisma/client";

type User = {
  id: string;
  email: string;
  name: string;
  role: RoleType;
};

export interface CustomRequest extends Request {
  user?: User | null;
  file?: Express.Multer.File;
  files?:
    | Express.Multer.File[]
    | { [fieldname: string]: Express.Multer.File[] };
}
