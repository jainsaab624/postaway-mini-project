import express from "express";



import UserController from "./user.controller.js";
const userController = new UserController();
export const userRouter = express.Router();


userRouter.post("/signup", userController.signup);
userRouter.post("/signin", userController.signin);
