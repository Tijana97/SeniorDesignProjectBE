import express from "express";
import userController from "./controller";
import { authenticateJWT } from "../../common/jwt";
const userRouter = express.Router();

// POST USER
userRouter.post("/register", userController.createUser);

userRouter.post("/login", userController.loginUser);

// GET USER
userRouter.get("/", authenticateJWT, userController.getAllUsers);
userRouter.get("/me", authenticateJWT, userController.getMe);

// PUT USER
userRouter.put("/:userId", authenticateJWT, userController.updateUser);

// DELETE USER
userRouter.delete("/:userId", authenticateJWT, userController.deleteUser);

export default userRouter;
