import { DBClient } from "@creative-companion/database";
import { Request, Response } from "express";
import { User } from "../types/user";
import {
  createToken,
  encryptPasword,
  validatePassword,
} from "../utils/utilsAuth";

export const userController = {
  getUsers: async (req: Request, res: Response) => {
    const users = await DBClient.user.findMany({ include: { artwork: true } });
    res.json(users);
  },

  getUserById: async (req: Request, res: Response) => {
    const userId = req.params.id;
    const user = await DBClient.user.findUnique({
      where: { id: Number(userId) },
      include: { artwork: true },
    });
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.status(200).json(user);
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
    const newUser = {
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
      console.log("body", password);
      console.log("db", user.password);
      console.log(isMatching);

      if (!isMatching) throw new Error("Invalid Credentials");

      const token = createToken(user.id.toString(), email);
      res.status(200).json({
        message: `${user.username} logged in successfully`,
        token: token,
      });
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  },

  deleteUser: async (req: Request, res: Response) => {
    const { userid } = req.body;
    const user = await DBClient.user.findUnique({
      where: { id: userid },
    });
    if (!user) throw new Error("404 User not found");
    await DBClient.user.delete({ where: { id: userid } });
  },
};
