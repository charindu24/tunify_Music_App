import { Router } from 'express';
import { getAllusers } from '../controller/user.controller.js';
import { protectRoute } from "../middleware/auth.middleware.js";


const router = Router();

router.get("/", protectRoute, getAllusers);
//to do: getMessage route

export default router;