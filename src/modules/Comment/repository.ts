import Comment, { CommentInterface } from "./model";

// getCommentsByPost   createComment, deleteComment, deleteCommentsByPost
const getCommentsByPost = async (
  postId: string
): Promise<CommentInterface[]> => {
  return await Comment.find({ postId: postId });
};

const createComment = async (
  data: CommentInterface
): Promise<CommentInterface | null> => {
  try {
    return await Comment.create(data);
  } catch (error: any) {
    console.log("ERROR: ", error);
    return null;
  }
};

const deteleComment = async (
  commentId: string
): Promise<CommentInterface | null> => {
  try {
    return await Comment.findByIdAndDelete(commentId);
  } catch (error: any) {
    return null;
  }
};

const deleteCommentsByPost = async (postId: string) => {
  const comments = await getCommentsByPost(postId);
  for (const comment of comments) {
    await Comment.findByIdAndDelete(comment._id);
  }
};

export default {
  getCommentsByPost,
  createComment,
  deleteCommentsByPost,
  deteleComment,
};
