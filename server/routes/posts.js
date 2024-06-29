import { Router } from "express";
import { createNewPost, getAllPosts } from "../controllers/posts.js";
import { checkAuth } from "../middlewares/checkAuth.js";

const router = new Router()

//Create post api/post
router.post('/', checkAuth, createNewPost)

//Get all posts
router.get("/", getAllPosts)

export default router