import React, { useState, useEffect } from "react";
import SignUp from "../component/SignUp";
import Login from "../component/Login";
import axios from "axios";
import { toast } from "react-toastify";

export default function Authentication() {
    const [isSignUp, setIsSignUp] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [serverStatus, setServerStatus] = useState(false);

    useEffect(() => {
        const toastId = toast.loading("Server is spinning up...");
        const warmUp = async () => {
            try {
                const response = await axios.get("https://notes-qpy7.onrender.com/api/warmup");
                if (response.status === 200) {
                    toast.update(toastId, {
                        render: "Server is Online 🎉",
                        type: "success",
                        isLoading: false,
                        autoClose: 3000,
                    });
                    setServerStatus(true);
                }
            } catch (err) {
                console.error("Warmup failed:", err);
                toast.update(toastId, {
                    render: "Something went wrong",
                    type: "error",
                    isLoading: false,
                    autoClose: 3000,
                });
            }
        };
        warmUp();
    }, []);

    return (
        <div className="auth-page">
            {/* Left — Branding panel */}
            <div className="auth-left">
                <div className="brand-mark">
                    <div className="brand-icon">✦</div>
                    <div className="brand-name">Folio</div>
                </div>
                <h1 className="auth-headline">
                    Where your<br />thoughts find<br /><em>clarity.</em>
                </h1>
                <p className="auth-subtext">
                    A private space to capture, organize, and revisit the ideas that matter most to you.
                </p>
            </div>

            {/* Right — Form panel */}
            <div className="auth-right">
                <div className="auth-toggle">
                    <button
                        className={isLogin ? "active" : ""}
                        onClick={() => { setIsLogin(true); setIsSignUp(false); }}
                    >
                        Sign In
                    </button>
                    <button
                        className={isSignUp ? "active" : ""}
                        onClick={() => { setIsSignUp(true); setIsLogin(false); }}
                    >
                        Create Account
                    </button>
                </div>

                {isLogin && <Login />}
                {isSignUp && <SignUp />}
            </div>
        </div>
    );
}