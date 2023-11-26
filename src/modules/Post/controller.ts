import { AppRequest } from "../../common/jwt";
import { Response } from "express";
import postService from "./service";

const getAllPosts = async (req: AppRequest, res: Response) => {
  const response = await postService.getAllPosts();
  res.send(response);
};

const getPostById = async (req: AppRequest, res: Response) => {
  const { postId } = req.params;
  const response = await postService.getPostById(postId);
  if (response === null) {
    res.status(404).send("Post Not Found.");
  } else res.send(response);
};

const getPostByUserId = async (req: AppRequest, res: Response) => {
  const { userId } = req.params;
  const response = await postService.getPostsByUserId(userId);
  if (response === null) {
    res.status(404).send("User Not Found.");
  } else res.send(response);
};

const updatePost = async (req: AppRequest, res: Response) => {
  const { postId } = req.params;
  const data = req.body;
  const response = await postService.updatePost(postId, data);

  if (response === null) {
    res.status(404).send("Post Could Not Be Updated.");
  } else res.send(response);
};

const deletePost = async (req: AppRequest, res: Response) => {
  const { postId } = req.params;
  const response = postService.deletePost(postId);
  if (response === null) {
    res.status(404).send("Post Not Found.");
  } else res.send(response);
};

export default {
  getAllPosts,
  getPostById,
  getPostByUserId,
  updatePost,
  deletePost,
};
