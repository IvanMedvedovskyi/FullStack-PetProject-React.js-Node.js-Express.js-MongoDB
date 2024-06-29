import { Router } from "express";
import { createNewPost, getAllPosts, getById, getOwnPosts } from "../controllers/posts.js";
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

export default router;