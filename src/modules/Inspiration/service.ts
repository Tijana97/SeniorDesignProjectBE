import { InspirationInterface } from "./model";
import inspirationRepository from "./repository";

const getInspirationsByUserId = async (
  userId: string
): Promise<InspirationInterface[]> => {
  return await inspirationRepository.getInspitaionByUserId(userId);
};

const createInspiration = async (
  data: InspirationInterface
): Promise<InspirationInterface | null> => {
  console.log("OPET: ", data);
  try {
    return await inspirationRepository.createInspiration(data);
  } catch (error: any) {
    console.log("ERROR: ", error);
    return null;
  }
};

const deleteInspirationById = async (
  userId: string,
  postId: string
): Promise<InspirationInterface | null> => {
  try {
    return await inspirationRepository.deleteInspirationById(userId, postId);
  } catch (error: any) {
    return null;
  }
};

const deleteInspirationsByPostId = async (postId: string) => {
  await inspirationRepository.deleteInspirationByPostId(postId);
};

export default {
  getInspirationsByUserId,
  createInspiration,
  deleteInspirationById,
  deleteInspirationsByPostId,
};
