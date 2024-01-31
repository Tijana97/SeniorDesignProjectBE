import { AppRequest } from "../../common/jwt";
import { Response } from "express";
import inspirationService from "./service";
import postService from "../Post/service";
import { PostInterface } from "../Post/model";

const getInspirationsByUserId = async (req: AppRequest, res: Response) => {
  const { userId } = req.params;
  const inspirations = await inspirationService.getInspirationsByUserId(userId);
  const posts: PostInterface[] = [];
  for (const inspo of inspirations) {
    const post = await postService.getPostById(inspo.postId);
    if (post !== null) {
      posts.push(post);
    }
  }
  res.send(posts);
};

const createInspiration = async (req: AppRequest, res: Response) => {
  const { data } = req.body;
  console.log("DATA: ", data);
  const response = await inspirationService.createInspiration(data);
  if (response === null) {
    res.status(404).send("Inspiration Could Not Be Created.");
  } else {
    res.send(response);
  }
};

const deleteInspiration = async (req: AppRequest, res: Response) => {
  const { userId, postId } = req.params;
  const response = await inspirationService.deleteInspirationById(
    userId,
    postId
  );
  if (response === null) {
    res.status(404).send("Inspiration Could Not Be Created.");
  } else {
    res.send(response);
  }
};

export default {
  getInspirationsByUserId,
  createInspiration,
  deleteInspiration,
};
