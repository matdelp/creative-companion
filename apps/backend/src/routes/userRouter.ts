import express from "express";
import passport from "passport";
import { userController } from "../controllers/userController";
import { auth } from "../middleware/authenticate";
import multer from "multer";
import { demo } from "../middleware/demo";

export const userRouter = express.Router();

userRouter.use(passport.initialize());
userRouter.use(passport.session());

userRouter.get("/profile", auth, userController.getUserById);
userRouter.get("/me", auth, userController.me);
userRouter.get("/islogin", userController.checkUser);
userRouter.get("/creationDate", auth, userController.getCreationDate);
userRouter.patch("/edit", auth, demo, userController.editUserProfile);
userRouter.patch(
  "/editPhoto",
  multer().single("picture"),
  auth,
  demo,
  userController.submitProfilePhoto
);
userRouter.post("/register", userController.createUser);
userRouter.post("/login", userController.loginUser);
userRouter.post("/logout", userController.logoutUser);
userRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
userRouter.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  userController.googleLoginUser
);
userRouter.post("/google/logout", userController.googleLogoutUser);
userRouter.delete("/delete", auth, userController.deleteUser);
userRouter.get("/", userController.getUsers);
