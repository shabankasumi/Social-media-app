import express from "express";
import { PostModel } from "../models/post.models.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/MulterMiddleware.js";
import { imagekit } from "../util/imagekit.js";

const router = express.Router();

// CREATE POST
router.post("/", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!req.file) return res.status(400).json("Image is required");
    const post = await imagekit.upload({
      file: req.file.buffer,
      fileName: req.file.originalname,
      folder: "posts"
    });

    const newPost = await PostModel.create({
      title,
      content,
      image: post.url,
      author: req.userId
    });

    res.json(post);

  } catch (err) {
    res.status(500).json(err.message);
  }
});
// DELETE POST
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const post = await PostModel.findById(req.params.id);

        if (!post) return res.status(404).json("Post not found");


        if (post.author.toString() !== req.userId) {
            return res.status(403).json("Not authorized");
        }

        await post.deleteOne();

        res.json("Post deleted successfully");

    } catch (err) {
        res.status(500).json(err.message);
    }
});

router.get("/", authMiddleware, async (req, res) => {
    try {
        const posts = await PostModel.find()
            .populate("author", "name email")
            .sort({ createdAt: -1 });

        res.json(posts);
    } catch (err) {
        res.status(500).json(err.message);
    }
});
router.put("/like/:id", authMiddleware, async (req, res) => {
    try {
        const post = await PostModel.findById(req.params.id);

        if (!post) return res.status(404).json("Post not found");

        const alreadyLiked = post.likes.includes(req.userId);

        if (alreadyLiked) {
            post.likes.pull(req.userId);
        } else {
            post.likes.push(req.userId);
        }

        await post.save();

        const updatedPost = await PostModel.findById(post._id)
            .populate("author", "name email")

        res.json(updatedPost);

    } catch (err) {
        res.status(500).json(err.message);
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
export default router;