import express from "express";
import { userController } from "../controllers/userController";
import { auth } from "../middleware/authenticate";

export const userRouter = express.Router();

userRouter.get("/profile", auth, userController.getUserById);
userRouter.get("/islogin", auth, userController.checkUser);
userRouter.post("/register", userController.createUser);
userRouter.post("/login", userController.loginUser);
userRouter.delete("/delete", auth, userController.deleteUser);
userRouter.get("/", userController.getUsers);
