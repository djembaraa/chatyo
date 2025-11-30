import { strict } from "assert";
import { sender } from "../mailtrap";
import { z } from "zod";

export const createRoomPersonalSchema = z
  .object({
    user_id: z.string(),
  })
  .strict();

export type CreateRoomPersonalValues = z.infer<typeof createRoomPersonalSchema>;
