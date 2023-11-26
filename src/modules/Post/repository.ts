import Post, { PostInterface } from "./model";

const createPost = async (
  data: PostInterface
): Promise<PostInterface | null> => {
  try {
    return await Post.create(data);
  } catch (error: any) {
    console.error("MY ERROR", error);
    throw new Error("Error creating post");
  }
};

const getAllPosts = async (): Promise<PostInterface[]> => {
  return await Post.find().sort({ creationDate: -1 });
};

const getPostById = async (postId: string): Promise<PostInterface | null> => {
  try {
    return Post.findById(postId);
  } catch (error: any) {
    return null;
  }
};

const getPostsByUserId = async (userId: string): Promise<PostInterface[]> => {
  return await Post.find({ userId: userId }).sort({ creationDate: -1 });
};

const updatePost = async (
  postId: string,
  data: Partial<PostInterface>
): Promise<PostInterface | null> => {
  const { userId, imageURL, creationDate, ...mutableData } = data;
  try {
    return await Post.findByIdAndUpdate(postId, data, { new: true });
  } catch (error: any) {
    return null;
  }
};

const deletePost = async (postId: string): Promise<PostInterface | null> => {
  try {
    return Post.findByIdAndDelete(postId);
  } catch (error: any) {
    return null;
  }
};

export default {
  createPost,
  getAllPosts,
  getPostById,
  getPostsByUserId,
  updatePost,
  deletePost,
};
