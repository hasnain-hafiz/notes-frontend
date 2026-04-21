import React, { useState, useEffect } from "react";
import SignUp from "../component/SignUp";
import Login from "../component/Login";
import axios from "axios";

export default function Authentication() {

    const [isSignUp, setIsSignUp] = useState(false);
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        const warmUp = async () => {
            try {
                await axios.get("https://notes-qpy7.onrender.com/api/warmup");
            } catch (err) {
                console.error("Warmup failed:", err);
            }
        };

        warmUp();
    }, []);

    return (
        <>
            <div className="auth-toggle">
                <button onClick={() => { setIsSignUp(true); setIsLogin(false); }}>
                    Sign Up
                </button>

                <button onClick={() => { setIsLogin(true); setIsSignUp(false); }}>
                    Log In
                </button>
            </div>

            {isSignUp && <SignUp />}
            {isLogin && <Login />}
        </>
    );
}