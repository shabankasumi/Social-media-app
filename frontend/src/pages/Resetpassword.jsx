import React, { useState } from "react";
import { resetPassword } from "../services/auth.services";
import { useSearchParams } from "react-router-dom";
export const Resetpassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!token) {
            return alert("Invalid or missing reset token.");
        }

        try {
            const res = await resetPassword(token, newPassword);
            if (res?.message) {
                alert(res.message);
            } else {
                alert("Password reset successful! You can now log in with your new password.");
            }
        } catch (err) {
            console.error(err);
            alert("Error resetting password");
        }
    };

    
    return (
        <div>
          <h1>Reset Password Page

          </h1>
            <form onSubmit={handleSubmit}>
                <input type="password" placeholder="Enter new password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                <button type="submit">Reset Password</button>
            </form>

        </div>
    );
};