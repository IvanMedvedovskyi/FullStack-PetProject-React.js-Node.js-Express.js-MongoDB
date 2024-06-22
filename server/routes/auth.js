import { Router } from "express";
import {register, login, getMe} from '../controllers/auth.js'
import { checkAuth } from "../middlewares/checkAuth.js";

const router = new Router()

//Registration api/auth/register
router.post('/register', register)

//Login api/auth/login
router.post('/login', login)

//Get me Info api/auth/me
router.get('/me', checkAuth, getMe)

export default router