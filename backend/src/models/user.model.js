import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String, // ✅ Fixed: Changed `typeof` to `type`
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    clerkId: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true } // createdAt, updatedAt
);

export const User = mongoose.model("User", userSchema);
