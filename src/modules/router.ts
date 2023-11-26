import express from "express";
import userRouter from "./User/router";
import postRouter from "./Post/router";

const router = express.Router();

router.use("/users", userRouter);
router.use("/posts", postRouter);

export default router;
