import express from "express";
import commentController from "./controller";
import { authenticateJWT } from "../../common/jwt";

const commentRouter = express.Router();

//GET COMMENTS BY POST
commentRouter.get(
  "/:postId",
  authenticateJWT,
  commentController.getCommentsByPostId
);

//CREATE COMMENT
commentRouter.post("/new", authenticateJWT, commentController.createComment);

//DELETE COMMENT
commentRouter.delete(
  "/:commentId",
  authenticateJWT,
  commentController.createComment
);

export default commentRouter;
