import { Request, Response } from "express";
import { users } from "../dummyData"; //removed upon db implementation
import { User } from "../types/user";
import { createToken, encryptPasword, validatePassword } from "../utils";

export const userController = {
  getUsers: (req: Request, res: Response) => {
    res.json(users);
  },

  getUserById: (req: Request, res: Response) => {
    const userId = req.params.id;
    const user = users.find((user) => user.id === Number(userId));
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
    const { first_name, last_name, username, email, password, tags } = req.body;
    // TODO: add validation schema (JOI?)

    // TODO: when db available
    // const checkEmail = await Model.findOne({ email });
    //   if (checkEmail) {
    //     res.status(400).json({ message: "email already used to register" });
    //     return;
    //   }
    // const checkUsername = await Model.findOne({ username });
    //   if (checkUsername) {
    //     res.status(400).json({ message: "username already in used" });
    //     return;
    //   }
    const hashedPswd = await encryptPasword(password);
    const newUser: User = {
      id: users.length + 1, //TODO remove after db implementation
      first_name: first_name,
      last_name: last_name,
      username: username,
      email: email,
      password: hashedPswd,
      posted_artwork: 0,
      tags: tags,
      artworks: [],
    };
    users.push(newUser); //TODO remove after db implementation
    res.json({
      message: `User ${newUser.username} created successfully`,
    });
  },

  loginUser: async (req: Request, res: Response) => {},
  //     try {
  //     //  TODO const { error, value } = loginSchema.validate(req.body);
  //       const { email, password } = req.body;

  //     //   if (error) {
  //     //     res.status(400).json({ error: error.details[0].message });
  //     //     return;
  //     //   }
  //       const user = await userModel.findOne({ email });
  //       if (!user) throw new Error("Invalid Credentials");
  //       if (!user.is_verified) throw new Error("Email has not been verified");
  //       const isMatching = await validatePassword(password, user.password);
  //       if (!isMatching) throw new Error("Invalid Credentials");

  //       const token = createToken(user._id.toString(), email, "user");
  //       res.status(200).json({
  //         message: `User ${email} logged in successfully`,
  //         token: token,
  //       });
  //     } catch (error: any) {
  //       res.status(400).json({
  //         message: error.message,
  //       });
  //     }
  //   },

  deleteUser: (req: Request, res: Response) => {}, //TODO with db
};
