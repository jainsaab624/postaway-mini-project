import express from "express";
import { upload } from "../../middleware/fileupload.middleware.js";
import PostController from "./post.controller.js";

const postController = new PostController();
export const postRouter = express.Router();

postRouter.get("/all", postController.getAllPosts);
postRouter.get("/:id", postController.getPostByPostID);
postRouter.get("/", postController.getPostByUserID);
postRouter.post("/", upload.single("ImageURL"), postController.createPost);
postRouter.delete("/:id", postController.deletePostByID);
postRouter.put(
  "/:id",
  upload.single("ImageURL"),
  postController.updatePostByID
);
postRouter.post("/filter", postController.filterPostByCaption);
postRouter.post("/bookmarks/:id", postController.bookMark);
postRouter.get("/allbookmarks/all", postController.getAllBookMark);
postRouter.post(
  "/drafts",
  upload.single("ImageURL"),
  postController.savePostAsDraft
);
postRouter.get("/drafts/alldrafts", postController.getDraftPosts);
postRouter.post("/archive/:id", postController.savePostAsArchive);
postRouter.get("/archive/allarchives", postController.getArchivePosts);
