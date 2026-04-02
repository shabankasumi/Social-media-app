
import express from "express";
import { UserModel } from "../models/user.models.js";
const router = express.Router();

import { authMiddleware } from "../middleware/authMiddleware.js";



router.get('/', authMiddleware, async (req, res) => {
    try {
        const user = await UserModel.findById(req.user.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ user });
    } catch (error) {
        console.error('Error fetching profile:', error);
        return res.status(500).json({ message: "Internal server error" });

    }
});
// GET MY POSTS
router.get("/my-posts", authMiddleware, async (req, res) => {
    try {
        const posts = await PostModel.find({ author: req.userId })
            .populate("author", "name")
            .sort({ createdAt: -1 });

        res.json(posts);

    } catch (err) {
        res.status(500).json(err.message);
    }
});


export { profileRouter };