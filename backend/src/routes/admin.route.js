import { Router } from 'express';
import { checkAdmin, createAlbum, createSong, deleteAlbum, deleteSong } from '../controller/admin.controller.js';
import { protectRoute, requireAdmin } from '../middleware/auth.middleware.js';

const router = Router();

//minimialistic code to read clean
router.use(protectRoute,requireAdmin)

router.get("/check", checkAdmin);

router.post("/songs", createSong);
router.delete("/songs/:id", deleteSong);

router.post("/ablum", createAlbum);
router.delete("/ablum/:id", deleteAlbum);

export default router;