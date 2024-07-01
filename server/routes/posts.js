import { Router } from "express";
import { createNewPost, getAllPosts, getById, getOwnPosts, deletePostById, updatePost, getCommentToPost } from "../controllers/posts.js";
import { checkAuth } from "../middlewares/checkAuth.js";

const router = new Router()

//Create post
//http://localhost:3003/api/posts
router.post('/', checkAuth, createNewPost)

//Get all posts
//http://localhost:3003/api/posts
router.get("/", getAllPosts)

//Get Post by Id
//http://localhost:3003/api/posts/:id
router.get("/:id", getById)

//Get My Personal Posts
//http://localhost:3003/api/posts/user/me
router.get("/user/getmyposts", checkAuth, getOwnPosts)

//Get My Personal Posts
//http://localhost:3003/api/posts/:id
router.delete("/:id", checkAuth, deletePostById)

//Get My Personal Posts
//http://localhost:3003/api/posts/:id
router.put("/:id", checkAuth, updatePost)

//Get Comments to Post
//http://localhost:3003/api/posts/comments/:id
router.get("/comments/:id", getCommentToPost)

export default router;