import LikeController from "./like.controller.js";
import express from "express";


const likeController = new LikeController();
export const likeRouter = express.Router();


likeRouter.get("/:id", likeController.getLikesByID);
likeRouter.get("/toggle/:id", likeController.toggle);