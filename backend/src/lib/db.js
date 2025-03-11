import mongoose from "mongoose"; // Import mongoose

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.dbURI); // Use the correct environment variable name
        console.log(`Connected to MongoDB ${conn.connection.host}`);
    } catch (error) {
        console.log("Failed to connect to MongoDB", error);
        process.exit(1); // Exit with failure code
    }
};
