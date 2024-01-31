import express from "express";
import postController from "./controller";
import { authenticateJWT } from "../../common/jwt";
const postRouter = express.Router();

// GET POST
postRouter.get("/", authenticateJWT, postController.getAllPosts);
postRouter.get("/post/:postId", authenticateJWT, postController.getPostById);
postRouter.get(
  "/user/:userId",
  authenticateJWT,
  postController.getPostByUserId
);
postRouter.get(
  "/search/:search",
  authenticateJWT,
  postController.getPostsBySearch
);

postRouter.get("/tags", authenticateJWT, postController.getPostsByTags);
postRouter.get(
  "/filter/:search",
  authenticateJWT,
  postController.getPostsBySearchAndTags
);

// PUT POST
postRouter.put("/:postId", authenticateJWT, postController.updatePost);

// DELETE POST
postRouter.delete("/:postId", authenticateJWT, postController.deletePost);

export default postRouter;
