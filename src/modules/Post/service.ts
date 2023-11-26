import Post, { PostInterface } from "./model";
import postRepository from "./repository";

const getAllPosts = async (): Promise<PostInterface[]> => {
  return await postRepository.getAllPosts();
};

const getPostById = async (postId: string): Promise<PostInterface | null> => {
  try {
    return await postRepository.getPostById(postId);
  } catch (error: any) {
    return null;
  }
};

const getPostsByUserId = async (userId: string) => {
  try {
    return await postRepository.getPostsByUserId(userId);
  } catch (error: any) {
    return null;
  }
};

const updatePost = async (
  postId: string,
  data: Partial<PostInterface>
): Promise<PostInterface | null> => {
  try {
    return await postRepository.updatePost(postId, data);
  } catch (error: any) {
    return null;
  }
};

const deletePost = async (postId: string) => {
  try {
    return await postRepository.deletePost(postId);
  } catch (error: any) {
    return null;
  }
};

export default {
  getAllPosts,
  getPostById,
  getPostsByUserId,
  updatePost,
  deletePost,
};
