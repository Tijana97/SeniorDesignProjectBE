import express from "express";
import userRouter from "./User/router";

const router = express.Router();

router.use("/users", userRouter);

export default router;
