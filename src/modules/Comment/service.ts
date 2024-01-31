import { CommentInterface, CommentResponse } from "./model";
import commentRepository from "./repository";
import userService from "../User/service";

const createComment = async (
  data: CommentInterface
): Promise<CommentInterface | null> => {
  console.log("MOJA DATA: ", data);
  return await commentRepository.createComment(data);
};

const deleteComment = async (
  commentId: string
): Promise<CommentInterface | null> => {
  return await commentRepository.deteleComment(commentId);
};

const deleteCommentByPostId = async (postId: string) => {
  await commentRepository.deleteCommentsByPost(postId);
};

const getCommentsByPost = async (
  postId: string
): Promise<CommentResponse[]> => {
  const comments = await commentRepository.getCommentsByPost(postId);

  const usersArr: { userFirstName: string; userLastName: string }[] = [];
  for (const comment of comments) {
    const user = await userService.getMe(comment.userId);
    usersArr.push({
      userFirstName: user!!.name,
      userLastName: user!!.surname,
    });
  }

  const dataToReturn: CommentResponse[] = [];
  for (let i = 0; i < comments.length; i++) {
    dataToReturn.push({
      userId: comments[i].userId,
      userFirstName: usersArr[i].userFirstName,
      userLastName: usersArr[i].userLastName,
      content: comments[i].content,
      postId: comments[i].postId,
    });
  }
  return dataToReturn;
};

export default {
  getCommentsByPost,
  createComment,
  deleteComment,
  deleteCommentByPostId,
};
