import { DBClient } from "@creative-companion/database";
import {
  UserGoogle,
  UserInfo,
  UserPhoto,
  UserProfile,
} from "@creative-companion/common";
import { Request, Response } from "express";
import { User } from "@creative-companion/common";
import {
  createToken,
  encryptPasword,
  validatePassword,
} from "../utils/utilsAuth";
import { AuthenticatedRequest } from "../middleware/authenticate";
import { checkUsernameExists } from "../utils/utilsUsername";
import { supabase } from "../services/supabaseClient/client";

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

    let pictureUrl: string | undefined = undefined;
    if (user.picture) {
      const { data, error } = await supabase.storage
        .from("profilepicture")
        .createSignedUrl(user.picture, 3600);

      if (!error && data?.signedUrl) {
        pictureUrl = data.signedUrl;
      }
    }
    const userProfile: UserProfile = {
      ...user,
      picture: user.picture ? pictureUrl : undefined,
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
    const checkUsername = await checkUsernameExists(username);
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

  editUserProfile: async (
    req: AuthenticatedRequest,
    res: Response<UserInfo | { error: string } | { message: string }>
  ) => {
    if (!req.body) {
      res.status(400).json({ error: "Body required" });
      return;
    }
    const { first_name, last_name, username, description } = req.body;
    // TODO: add validation schema (JOI?)
    const userId = req.userId;
    if (!userId) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const currentUser = await DBClient.user.findUnique({
      where: { id: userId },
    });
    if (!currentUser) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    if (username !== currentUser.username) {
      const checkUsername = await checkUsernameExists(username);
      if (checkUsername) {
        res.status(400).json({ message: "Username already in use" });
        return;
      }
    }

    const updatedUser: UserInfo = {
      first_name: first_name,
      last_name: last_name,
      username: username,
      description: description,
    };
    await DBClient.user.update({ where: { id: userId }, data: updatedUser });
    res.json({
      message: `User ${updatedUser.username} created successfully`,
    });
  },

  submitProfilePhoto: async (
    req: AuthenticatedRequest,
    res: Response<
      UserPhoto | { error: string } | { message: string; url: string }
    >
  ) => {
    if (!req.file) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }

    const userId = req.userId;
    const user = await DBClient.user.findUnique({ where: { id: userId } });

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const submittedFile = req.file;
    const { originalname, mimetype, buffer } = submittedFile;

    const fileExt = originalname.split(".").pop();
    const filePath = `user-${userId}/avatar.${fileExt}`;

    const { data, error } = await supabase.storage
      .from("profilepicture")
      .upload(filePath, buffer, {
        upsert: true,
        contentType: mimetype,
      });

    if (error) {
      res.status(500).json({ error: "Error uploading file" });
      return;
    }

    const { data: signedData, error: signedError } = await supabase.storage
      .from("profilepicture")
      .createSignedUrl(filePath, 3600);

    if (signedError || !signedData) {
      res.status(500).json({ error: "Error generating signed URL" });
      return;
    }

    const signedUrl = signedData.signedUrl;

    await DBClient.user.update({
      where: { id: userId },
      data: {
        picture: filePath,
      },
    });

    res.json({
      message: "New photo uploaded successfully",
      url: signedUrl,
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
      if (!user.password) throw new Error("Invalid Credentials");
      const isMatching = await validatePassword(password, user.password);
      if (!isMatching) throw new Error("Invalid Credentials");

      const token = createToken(user.id.toString(), email);
      res
        .status(200)
        .cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: 3600000,
        })
        .json({ message: "Login successful" });
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  },
  logoutUser: (req: Request, res: Response) => {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
    });
    console.log("here");

    res.status(200).json({ message: "User logged out successfully" });
  },

  googleLoginUser: async (req: Request, res: Response) => {
    try {
      const user = req.user as UserGoogle; //TODO change that type
      if (!user) {
        throw new Error("Invalid Google user data");
      }

      const token = createToken(user.id.toString(), user.email);
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: 3600000, // 1 hour
        })
        .redirect("http://localhost:5173"); //TODO before deploiement
    } catch (error: any) {
      res.redirect(`${req.baseUrl}/login?auth=failed`);
    }
  },

  googleLogoutUser: async (req: Request, res: Response) => {
    req.logout(() => {
      req.session.destroy(() => {
        res.clearCookie("token", {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          path: "/",
        });
        res.json({ message: "Google user logged out successfully" });
      });
    });
  },

  deleteUser: async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.userId;
    const user = await DBClient.user.findUnique({
      where: { id: userId },
    });
    if (!user) throw new Error("404 User not found");
    await DBClient.user.delete({ where: { id: userId } });
    res;
    res
      .clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
      })
      .redirect("http://localhost:5173");
  },

  checkUser: async (req: AuthenticatedRequest, res: Response) => {
    res.json({ login: true });
  },
};
