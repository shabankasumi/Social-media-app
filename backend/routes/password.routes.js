import express from "express";
import bcrypt from "bcryptjs";
import { UserModel } from "../models/user.models.js";
import { generatepasswordResetToken } from "../util/token.js";
import { Token } from "../models/Token.model.js";
import { sendEmail } from "../util/mailer.js";

export const passwordRouter = express.Router();

passwordRouter.post("/forgot-password", async (req, res) => {
    // Logic to handle forgot password
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const userexists = await UserModel.findOne({
            email
        });
        if (!userexists) {
            return res.status(404).json({ message: "User not found" });
        }
        const resetToken = generatepasswordResetToken();
        const tokenEntry = new Token({
            user: userexists._id,
            token: resetToken,
        });
        await tokenEntry.save();
        const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;
        await sendEmail({
            to: userexists.email,
            subject: "Password Reset Request",
            templateName: "reset-password",
            variables: { resetLink }
        });

        return res.json({ message: "Password reset token generated", resetLink });

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
    ;
});

passwordRouter.post("/reset-password", async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        if (!token || !newPassword) {
            return res.status(400).json({ message: "Token and new password are required" });
        }
        const tokenEntry = await Token.findOne({
            token
        });
        if (!tokenEntry) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }
        const user = await UserModel.findById(tokenEntry.user);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
        await tokenEntry.deleteOne();
        return res.json({ message: "Password reset successful" });
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});