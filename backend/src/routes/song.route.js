import { Router } from 'express';
import { getAllSongs, loadFeaturedSongs, loadMadeForYouSongs, loadTrendingSongs } from '../controller/song.controller.js';
import { protectRoute, requireAdmin} from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", protectRoute, requireAdmin, getAllSongs);
router.get("/featured", loadFeaturedSongs);
router.get("/madeForYou", loadMadeForYouSongs);
router.get("/trending", loadTrendingSongs);


export default router;