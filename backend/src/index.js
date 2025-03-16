import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";
import fileUpload from 'express-fileupload';
import path from 'path';


import { connectDB } from "./lib/db.js"; // Import database connection
import express from "express"; // Import express

import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import adminRoutes from "./routes/admin.route.js";
import songRoutes from "./routes/song.route.js";
import albumRoutes from "./routes/album.route.js";
import statsRoutes from "./routes/stats.route.js";


dotenv.config();


const app = express();
const PORT = process.env.PORT; // Default to 5000 if PORT is not defined

app.use(express.json()); //to parse req.body
app.use(clerkMiddleware()); // this wil add auth to req object
const __dirname = path.resolve();
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "temp"),
    createParentPath: true,
    limits: {
        fileSize: 10 *1024 * 1024, //maximum file size 10mb
    }
}));

// API routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/song", songRoutes);
app.use("/api/album", albumRoutes);
app.use("/api/stats", statsRoutes);

//error handler
app.use((err, req, res, next) => {
    res.status(500).json({ message: process.env.NODE_ENV === "production" ? "Internal server error" : err.message});
});

// Start server
app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
    connectDB(); // Connect to database
});

//todo socket.io implementation
