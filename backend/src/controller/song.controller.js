import { Song } from "../models/song.model.js";

export const getAllSongs = async (req, res) => {
    try {
        const songs = await Song.find().sort({createdAt: -1});
        // Find all songs in the database and sort them by creation date (newest first)
// Explanation:
// - The `find()` method retrieves all songs from the database.
// - `sort({ createdAt: -1 })` sorts them in descending order.
// - `-1` means "newest first" (latest `createdAt` timestamp).
// - If we used `1` instead, it would sort in ascending order (oldest first).
res.json(songs);
    } catch (error) {
        next(error);
    }
};

export const loadFeaturedSongs = async (req, res) => {
    try {
    // Perform an aggregation pipeline operation on the Song collection
        const songs = await Song.aggregate([
            {
                $sample:{ size: 6 },
            },
            {
                $project:{
                    _id:1,
                    title:1,
                    artist:1,
                    imageUrl:1,
                    audioUrl:1,
                },
            },
        ]);

        res.json(songs);

    } catch (error) {
        next(error);
        
    };
};

export const loadMadeForYouSongs = async (req, res) => {
    try {
        // fet
            const songs = await Song.aggregate([
                {
                    $sample:{ size: 4 },
                },
                {
                    $project:{
                        _id:1,
                        title:1,
                        artist:1,
                        imageUrl:1,
                        audioUrl:1,
                    },
                },
            ]);
    
            res.json(songs);
    
        } catch (error) {
            next(error);
            
        };
};

export const loadTrendingSongs = async (req, res) => {
    try {
        // Perform an aggregation pipeline operation on the Song collection
            const songs = await Song.aggregate([
                {
                    $sample:{ size: 4 },
                },
                {
                    $project:{
                        _id:1,
                        title:1,
                        artist:1,
                        imageUrl:1,
                        audioUrl:1,
                    },
                },
            ]);
    
            res.json(songs);
    
        } catch (error) {
            next(error);
            
        };
};
