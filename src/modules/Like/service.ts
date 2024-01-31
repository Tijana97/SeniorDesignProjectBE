import { LikeInterface } from "./model";
import likeRepository from "./repository";

const getLikesByPost = async (postId: string): Promise<LikeInterface[]> => {
  return await likeRepository.getLikesByPost(postId);
};

const createLike = async (
  data: LikeInterface
): Promise<LikeInterface | null> => {
  return await likeRepository.createLike(data);
};

const deletLikesByPost = async (postId: string) => {
  await likeRepository.deleteLikesByPostId(postId);
};

const deleteLike = async (
  data: LikeInterface
): Promise<LikeInterface | null> => {
  return await likeRepository.deleteLike(data);
};

export default { getLikesByPost, createLike, deletLikesByPost, deleteLike };
