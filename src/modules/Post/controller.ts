import { AppRequest } from "../../common/jwt";
import { Response } from "express";
import postService from "./service";
import inspirationService from "../Inspiration/service";
import commentService from "../Comment/service";

const getAllPosts = async (req: AppRequest, res: Response) => {
  const response = await postService.getAllPosts();
  res.send(response);
};

const getPostById = async (req: AppRequest, res: Response) => {
  const { postId } = req.params;
  const response = await postService.getPostById(postId, req.user._id);
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
  } else {
    await inspirationService.deleteInspirationsByPostId(postId);
    await commentService.deleteCommentByPostId(postId);
    res.send(response);
  }
};

const getPostsBySearch = async (req: AppRequest, res: Response) => {
  const { search } = req.params;
  const response = await postService.getPostBySearch(search);
  res.send(response);
};

const getPostsByTags = async (req: AppRequest, res: Response) => {
  const tags = req.query.tags as string[];
  const response = await postService.getPostByTags(tags);
  res.send(response);
};

const getPostsBySearchAndTags = async (req: AppRequest, res: Response) => {
  const { search } = req.params;
  const tags = req.query.tags as string[];
  const response = await postService.getPostsBySearchAndTags(search, tags);
  res.send(response);
};

export default {
  getAllPosts,
  getPostById,
  getPostByUserId,
  updatePost,
  deletePost,
  getPostsBySearch,
  getPostsByTags,
  getPostsBySearchAndTags,
};
