 import { User, type IUser } from "./user.schema";

const createUser = async (payload: Partial<IUser>): Promise<IUser> => {
  const user = new User(payload);
  return await user.save();
};

const getUsers = async (): Promise<IUser[]> => {
  return await User.find();
};

const getUserById = async (id: string): Promise<IUser | null> => {
  return await User.findById(id);
};

const updateUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  return await User.findByIdAndUpdate(id, payload, { new: true });
};

const deleteUser = async (id: string): Promise<IUser | null> => {
  return await User.findByIdAndDelete(id);
};

// 🔐 Login Service
const loginUser = async (
  email: string,
  password: string
): Promise<IUser | null> => {
  const user = await User.findOne({ email });
  if (!user) return null;

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return null;

  return user;
};

export const UserService = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
};
