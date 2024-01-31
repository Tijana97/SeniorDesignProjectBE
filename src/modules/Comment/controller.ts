import { AppRequest } from "../../common/jwt";
import { Response } from "express";
import commentService from "./service";

const getCommentsByPostId = async (req: AppRequest, res: Response) => {
  const { postId } = req.params;
  const response = await commentService.getCommentsByPost(postId);
  res.send(response);
};

const createComment = async (req: AppRequest, res: Response) => {
  const { data } = req.body;
  console.log("MOJA DATA: ", req.body);
  const response = await commentService.createComment(data);
  if (response === null) {
    res.status(404).send("Comment could not be created.");
  } else {
    res.send(response);
  }
};

const deleteComment = async (req: AppRequest, res: Response) => {
  const { commentId } = req.params;
  const response = await commentService.deleteComment(commentId);
  if (response === null) {
    res.status(404).send("Comment could not be deleted.");
  } else {
    res.send(response);
  }
};

export default {
  getCommentsByPostId,
  createComment,
  deleteComment,
};
