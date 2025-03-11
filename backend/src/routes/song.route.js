import { Router } from 'express';
import { getSong } from '../controller/song.controller.js';


const router = Router();

router.get("/", getSong );

export default router;