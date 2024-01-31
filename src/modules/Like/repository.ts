import Like, { LikeInterface } from "./model";

const getLikesByPost = async (postId: string): Promise<LikeInterface[]> => {
  return await Like.find({ postId: postId });
};

const getLikesByPostAndUser = async (
  postId: string,
  userId: string
): Promise<LikeInterface | null> => {
  try {
    return await Like.findOne({ postId: postId, userId: userId });
  } catch (error: any) {
    return null;
  }
};

const createLike = async (
  data: LikeInterface
): Promise<LikeInterface | null> => {
  const likeExists = await getLikesByPostAndUser(data.postId, data.userId);
  console.log("LIKE: ", data);
  if (likeExists !== null) {
    return null;
  } else {
    try {
      return await Like.create(data);
    } catch (error: any) {
      return null;
    }
  }
};

const deleteLikesByPostId = async (postId: string) => {
  const likes = await getLikesByPost(postId);
  for (const like of likes) {
    await Like.findByIdAndDelete(like._id);
  }
};

const deleteLike = async (
  data: LikeInterface
): Promise<LikeInterface | null> => {
  const likeExists = await getLikesByPostAndUser(data.postId, data.userId);
  if (likeExists !== null) {
    try {
      return await Like.findOneAndDelete({
        postId: data.postId,
        userId: data.userId,
      });
    } catch (error: any) {
      return null;
    }
  } else {
    return null;
  }
};

export default {
  getLikesByPost,
  deleteLikesByPostId,
  createLike,
  getLikesByPostAndUser,
  deleteLike,
};
