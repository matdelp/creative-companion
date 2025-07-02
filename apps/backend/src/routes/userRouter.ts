import express from "express";
import { userController } from "../controllers/userController";

export const userRouter = express.Router();

userRouter.get("/profile/:id", userController.getUserById);
userRouter.post("/register", userController.createUser);
userRouter.post("/login", userController.loginUser);
userRouter.delete("/delete/:id", userController.deleteUser);
userRouter.get("/", userController.getUsers);
