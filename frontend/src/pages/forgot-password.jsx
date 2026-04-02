import React, { useState } from "react";
import { forgotPassword } from "../services/auth.services";

export const ForgotPassword =() =>{
    const [email, setemail]= useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await forgotPassword(email);
            if (res?.message) {
                alert(res.message);
            } else {
                alert("Password reset link sent to your email");
            }
        } catch (err) {
            console.error(err);
            alert("Error sending reset link");
        }
    };

    return (
        <div>
            <h1>Forgot Password Page</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setemail(e.target.value)} required />
                <button type="submit">Send Reset Link</button>
            </form>
        </div>
    );
}