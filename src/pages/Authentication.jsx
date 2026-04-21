import React, { useState, useEffect } from "react";
import SignUp from "../component/SignUp";
import Login from "../component/Login";
import axios from "axios";
import { toast } from "react-toastify";

export default function Authentication() {

    const [isSignUp, setIsSignUp] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [serverStatus, setServerStatus] = useState(false);

    
    useEffect(() => {
        const toastId = toast.loading("Server is spinnig up...");
        const warmUp = async () => {
            try {
                const response = await axios.get("https://notes-qpy7.onrender.com/api/warmup");
                console.log("response", response)
                if (response.status == 200) {
                    toast.update(toastId, {
                        render: "Server is Online 🎉",
                        type: "success",
                        isLoading: false,
                        autoClose: 3000
                    });
                }
            } catch (err) {
                console.error("Warmup failed:", err);
                if (response.status !== 200) {
                    toast.update(toastId, {
                        render: "Something went wrong",
                        type: "failed",
                        isLoading: false,
                        autoClose: 3000
                    });
                }
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