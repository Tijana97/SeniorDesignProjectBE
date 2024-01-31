import express from "express";
import userRouter from "./User/router";
import postRouter from "./Post/router";
import inspirationRouter from "./Inspiration/router";
import commentRouter from "./Comment/router";
import likeRouter from "./Like/router";

const router = express.Router();

router.use("/users", userRouter);
router.use("/posts", postRouter);
router.use("/inspirations", inspirationRouter);
router.use("/comments", commentRouter);
router.use("/likes", likeRouter);

export default router;
