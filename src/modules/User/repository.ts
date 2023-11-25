import User, { UserInterface } from "./model";

const createUser = async (
  data: UserInterface
): Promise<UserInterface | null> => {
  try {
    return await User.create(data);
  } catch (error: any) {
    return null;
  }
};

const loginUser = async (email: string): Promise<UserInterface | null> => {
  try {
    return await User.findOne({ email: email });
  } catch (error: any) {
    return null;
  }
};

const getAllUsers = async (): Promise<UserInterface[]> => {
  return await User.find().select("-password");
};

const getMe = async (userId: string): Promise<UserInterface | null> => {
  try {
    return await User.findById(userId);
  } catch (error: any) {
    return null;
  }
};

const updateUser = async (
  userId: string,
  data: Partial<UserInterface>
): Promise<UserInterface | null> => {
  return await User.findByIdAndUpdate(userId, data, { new: true });
};

const deleteUser = async (userId: string): Promise<UserInterface | null> => {
  try {
    const response = await User.findByIdAndDelete(userId);
    return response;
  } catch (error: any) {
    return null;
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
