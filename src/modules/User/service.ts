import bcrypt from "bcrypt";
import { LoginResponseInterface, UserInterface } from "./model";
import { generateToken } from "../../common/jwt";
import userRepository from "./repository";

const saltRounds = 10;

const createUser = async ({
  data,
}: {
  data: UserInterface;
}): Promise<UserInterface | null> => {
  const hashedPassword = await bcrypt.hash(data.password, saltRounds);
  const user = await userRepository.createUser({
    ...data,
    email: data.email.toLowerCase(),
    password: hashedPassword,
  });
  if (user) {
    const { password, ...basicInfo } = JSON.parse(JSON.stringify(user));
    return basicInfo;
  } else {
    return null;
  }
};

const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<LoginResponseInterface | null> => {
  const user = await userRepository.loginUser(email);
  if (!user) {
    return null;
  }
  const isMatch = bcrypt.compareSync(password, `${user?.password}`);
  if (isMatch) {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    const { password, ...userWithoutPassword } = JSON.parse(
      JSON.stringify(user)
    );

    return {
      token: generateToken(user),
      expiresAt: currentDate.toISOString(),
      user: userWithoutPassword,
    };
  } else {
    return null;
  }
};

const getAllUsers = async (): Promise<UserInterface[]> => {
  const users = await userRepository.getAllUsers();
  return users;
};

const getMe = async (userId: string): Promise<UserInterface | null> => {
  const user = await userRepository.getMe(userId);
  if (!user) {
    return null;
  } else {
    const { password, ...userWithoutPassword } = JSON.parse(
      JSON.stringify(user)
    );
    return userWithoutPassword;
  }
};

const updateUser = async (
  userId: string,
  data: Partial<UserInterface>
): Promise<UserInterface | null> => {
  return await userRepository.updateUser(userId, data);
};

const deleteUser = async (userId: string): Promise<UserInterface | null> => {
  return await userRepository.deleteUser(userId);
};

export default {
  createUser,
  loginUser,
  getAllUsers,
  getMe,
  updateUser,
  deleteUser,
};
