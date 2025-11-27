import { z } from "zod";

export const groupFreeSchema = z.object({
  name: z.string().min(3),
  about: z.string(),
});

export const groupPaidSchema = groupFreeSchema.extend({
  price: z.string().transform((val) => Number(val)),
  benefits: z.array(z.string()).min(1),
});

export const joinFreeGroup = z.object({
  group_id: z.string(),
});

export const joinPaidGroup = z.object({
  groupId: z.string(),
});

export type GroupFreeValues = z.infer<typeof groupFreeSchema>;
export type GroupPaidValues = z.infer<typeof groupPaidSchema>;
export type joinFreeGroup = z.infer<typeof joinFreeGroup>;
