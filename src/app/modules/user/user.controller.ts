import express from "express";
import jwt from "jsonwebtoken";
import { UserService } from "./user.service";
import config from "../../config/index";

type Request = express.Request;
type Response = express.Response;

const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const image = req.file?.path as string;

    const user = await UserService.createUser({ name, email, password, image  });
    res.status(201).json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
};

const getUsers = async (req: Request, res: Response) => {
  const users = await UserService.getUsers();
  res.json({ success: true, data: users });
};

const getUserById = async (req: Request, res: Response) => {
  const user = await UserService.getUserById(req.params.id!);
  res.json({ success: true, data: user });
};

const updateUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  const payload: any = { name, email };

  if (req.file?.path) {
    payload.image = req.file.path;
  }

  const updatedUser = await UserService.updateUser(req.params.id!, payload);
  res.json({ success: true, data: updatedUser });
};

const deleteUser = async (req: Request, res: Response) => {
  await UserService.deleteUser(req.params.id!);
  res.json({ success: true, message: "User deleted successfully" });
};

//  Login Controller
const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await UserService.loginUser(email, password);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      config.jwt_secret as string,
      { expiresIn: "1h" }
    );

    res.json({ success: true, token });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
};

const UserController = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
};

export default UserController;
