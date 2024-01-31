import Inpiration, { InspirationInterface } from "./model";

const getInspitaionByUserIdAndPostId = async (
  userId: string,
  postId: string
): Promise<InspirationInterface | null> => {
  try {
    return await Inpiration.findOne({ userId: userId, postId: postId });
  } catch (error: any) {
    return null;
  }
};

const getInspitaionByUserId = async (
  userId: string
): Promise<InspirationInterface[]> => {
  return await Inpiration.find({ userId: userId });
};

const getInspitaionByPostId = async (
  postId: string
): Promise<InspirationInterface[]> => {
  return await Inpiration.find({ postId: postId });
};

const createInspiration = async (
  data: InspirationInterface
): Promise<InspirationInterface | null> => {
  const inspirationExists = await getInspitaionByUserIdAndPostId(
    data.userId,
    data.postId
  );
  if (inspirationExists === null) {
    try {
      const response = await Inpiration.create(data);
      return response;
    } catch (error: any) {
      return null;
    }
  } else {
    return null;
  }
};

const deleteInspirationById = async (
  userId: string,
  postId: string
): Promise<InspirationInterface | null> => {
  const inspiration = await getInspitaionByUserIdAndPostId(userId, postId);
  if (inspiration) {
    try {
      return await Inpiration.findByIdAndDelete(inspiration._id);
    } catch (error: any) {
      return null;
    }
  } else {
    return null;
  }
};

const deleteInspirationByPostId = async (postId: string) => {
  const inpirations = await getInspitaionByPostId(postId);
  for (const inspo of inpirations) {
    await Inpiration.findByIdAndDelete(inspo._id);
  }
};

export default {
  getInspitaionByUserId,
  createInspiration,
  deleteInspirationById,
  deleteInspirationByPostId,
  getInspitaionByUserIdAndPostId,
};
