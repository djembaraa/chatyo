import { strict } from "assert";
import { sender } from "../mailtrap";
import { z } from "zod";

export const createRoomPersonalSchema = z
  .object({
    user_id: z.string(),
  })
  .strict();

export const createMessageSchema = z.object({
  message: z.string().min(1, "Message cannot be empty"),
  room_id: z.string().min(1, "Room ID cannot be empty"),
});

export type CreateRoomPersonalValues = z.infer<typeof createRoomPersonalSchema>;
export type CreateMessageValues = z.infer<typeof createMessageSchema>;
