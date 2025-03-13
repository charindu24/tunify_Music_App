import { Router } from "express";
import {Song} from "../models/song.model.js";
import {Album} from "../models/album.model.js";
import {User} from "../models/user.model.js";


const router = Router();

router.get("/", async (req, res, next) =>  {
    try {
        //const totalSongs = await Song.countDocument();
        //const totalUsers = await User.countDocument();
        //const totalAlbums = await Album.countDocument();

        const [totalSongs, totalAlbums, totalUsers, uniqueArtists] = await Promise.all([
            Song.countDocument(),
            Album.countDocument(),
            User.countDocument(),

            Song.aggregate([
                {
                    $unionwidth: {
                        colls: "Albums",
                        pipeline: [],
                    }
                },
                {
                    $group: {
                        _id: "$artist",
                    }
                },
                {
                    $count: "count,"
                },
            ]),
     ]);
    } catch (error) {
        
    }

});