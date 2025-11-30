import * as chatRepo from "../repositories/chatRepositories";

export const createRoomPersonal = async (
  sender_id: string,
  receiver_id: string
) => {
  return await chatRepo.createRoomPersonal(sender_id, receiver_id);
};
