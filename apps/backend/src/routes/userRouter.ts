import express from "express";
import passport from "passport";
import { userController } from "../controllers/userController";
import { auth } from "../middleware/authenticate";

export const userRouter = express.Router();

userRouter.use(passport.initialize());
userRouter.use(passport.session());

userRouter.get("/profile", auth, userController.getUserById);
userRouter.get("/islogin", auth, userController.checkUser);
userRouter.post("/register", userController.createUser);
userRouter.post("/login", userController.loginUser);
userRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

userRouter.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  userController.googleLoginUser
);

userRouter.delete("/delete", auth, userController.deleteUser);
userRouter.get("/", userController.getUsers);
