import { DBClient } from "@creative-companion/database";
import { UserProfile } from "@creative-companion/common";
import { Request, Response } from "express";
import { User } from "../types/user";
import {
  createToken,
  encryptPasword,
  validatePassword,
} from "../utils/utilsAuth";
import { AuthenticatedRequest } from "../middleware/authenticate";

export const userController = {
  getUsers: async (req: Request, res: Response<UserProfile[]>) => {
    const users = await DBClient.user.findMany({ include: { artwork: true } });
    const userProfiles = users.map((user) => {
      const userProfile: UserProfile = {
        ...user,
        picture: user.picture ? user.picture : undefined,
        description: user.description ? user.description : undefined,
      };
      return userProfile;
    });
    res.json(userProfiles);
  },

  getUserById: async (
    req: AuthenticatedRequest,
    res: Response<UserProfile | { error: string }>
  ) => {
    const userId = req.userId;
    const user = await DBClient.user.findUnique({
      where: { id: userId },
      include: {
        artwork: {
          include: { artwork_has_tag: { include: { tag: true } } },
        },
      },
    });
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    const userProfile: UserProfile = {
      ...user,
      picture: user.picture ? user.picture : undefined,
      description: user.description ? user.description : undefined,
    };
    res.status(200).json(userProfile);
  },

  createUser: async (req: Request, res: Response) => {
    if (!req.body) {
      res.status(400).json({ error: "Body required" });
    }
    const { first_name, last_name, username, email, password } = req.body;
    // TODO: add validation schema (JOI?)

    const checkEmail = await DBClient.user.findUnique({
      where: { email: email },
    });
    if (checkEmail) {
      res.status(400).json({ message: "email already used to register" });
      return;
    }
    const checkUsername = await DBClient.user.findUnique({
      where: { username: username },
    });
    if (checkUsername) {
      res.status(400).json({ message: "username already in used" });
      return;
    }
    const hashedPswd = await encryptPasword(password);
    const newUser: User = {
      first_name: first_name,
      last_name: last_name,
      username: username,
      email: email,
      password: hashedPswd,
    };
    await DBClient.user.create({ data: newUser });
    res.json({
      message: `User ${newUser.username} created successfully`,
    });
  },

  loginUser: async (req: Request, res: Response) => {
    try {
      //  TODO const { error, value } = loginSchema.validate(req.body);
      const { email, password } = req.body;
      //   if (error) {
      //     res.status(400).json({ error: error.details[0].message });
      //     return;
      //   }

      const user = await DBClient.user.findUnique({
        where: { email: email },
      });
      if (!user) throw new Error("Invalid Credentials");
      // if (!user.is_verified) throw new Error("Email has not been verified");
      const isMatching = await validatePassword(password, user.password);
      if (!isMatching) throw new Error("Invalid Credentials");

      const token = createToken(user.id.toString(), email);
      res
        .status(200)
        .cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "strict", // or "lax" for dev?
          maxAge: 3600000,
        })
        .json({ message: "Login successful" });
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  },

  deleteUser: async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.userId;
    const user = await DBClient.user.findUnique({
      where: { id: userId },
    });
    if (!user) throw new Error("404 User not found");
    await DBClient.user.delete({ where: { id: userId } });
  },

  checkUser: async (req: AuthenticatedRequest, res: Response) => {
    res.json({ login: true });
  },
};
