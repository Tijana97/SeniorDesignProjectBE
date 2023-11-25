import { AppRequest } from "../../common/jwt";
import { Response } from "express";
import userService from "./service";

const createUser = async (req: AppRequest, res: Response) => {
  const data = req.body;
  const response = await userService.createUser({ data });
  if (response) {
    res.send(response);
  } else {
    res.status(404).send("User Already Exists.");
  }
};

const loginUser = async (req: AppRequest, res: Response) => {
  const { email, password } = req.body;
  const response = await userService.loginUser({ email, password });
  if (response) {
    res.send(response);
  } else {
    res.status(404).send("User not Found.");
  }
};

const getAllUsers = async (req: AppRequest, res: Response) => {
  const response = await userService.getAllUsers();
  res.send(response);
};

const getMe = async (req: AppRequest, res: Response) => {
  const { _id: userId } = req.user;
  const response = await userService.getMe(userId);
  if (response === null) {
    res.status(404).send("User Not Found.");
  } else res.send(response);
};

const updateUser = async (req: AppRequest, res: Response) => {
  const { userId } = req.params;
  const data = req.body;

  const response = await userService.updateUser(userId, data);
  if (response === null) {
    res.status(404).send("User Not Found.");
  } else res.send(response);
};

const deleteUser = async (req: AppRequest, res: Response) => {
  const { _id: currentUserId } = req.user;
  const { userId } = req.params;
  if (currentUserId.localeCompare(userId) === 0) {
    res.status(403).send("Cannot Delete Self.");
  } else {
    const response = await userService.deleteUser(userId);
    if (!response) {
      res.status(404).send("User Not Found.");
    } else {
      res.send(response);
    }
  }
};

export default {
  createUser,
  loginUser,
  getAllUsers,
  getMe,
  updateUser,
  deleteUser,
};
