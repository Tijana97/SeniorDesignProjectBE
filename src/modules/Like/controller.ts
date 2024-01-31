import { AppRequest } from "../../common/jwt";
import { Response } from "express";
import likeService from "./service";

const getLikesByPost = async (req: AppRequest, res: Response) => {
  const { postId } = req.params;
  return await likeService.getLikesByPost(postId);
};

const createLike = async (req: AppRequest, res: Response) => {
  console.log(req.body);
  const { data } = req.body;
  const response = await likeService.createLike(data);
  if (response === null) {
    res.status(404).send("Like Could Not Be Created.");
  } else {
    res.send(response);
  }
};
const deleteLike = async (req: AppRequest, res: Response) => {
  const { postId, userId } = req.params;
  const response = await likeService.deleteLike({ postId, userId });
  if (response === null) {
    res.status(404).send("Like Could Not Be Deleted.");
  } else {
    res.send(response);
  }
};

export default { getLikesByPost, createLike, deleteLike };
