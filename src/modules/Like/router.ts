import express from "express";
import likeController from "./controller";
import { authenticateJWT } from "../../common/jwt";

const likeRouter = express.Router();

//GET LIKES BY POST
likeRouter.get("/:postId", authenticateJWT, likeController.getLikesByPost);

//CREATE LIKE
likeRouter.post("/new", authenticateJWT, likeController.createLike);

//DELETE LIKE
likeRouter.delete(
  "/delete/:postId/:userId",
  authenticateJWT,
  likeController.deleteLike
);

export default likeRouter;
