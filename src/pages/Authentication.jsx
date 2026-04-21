import React, { useState } from "react";
import SignUp from "../component/SignUp";
import Login from "../component/Login";

export default function Authentication() {

    const [isSignUp, setIsSignUp] = useState(false);
    const [isLogin, setIsLogin] = useState(false);

    return (
        <>
            <div className="auth-toggle">
                <button onClick={() => { setIsSignUp(true); setIsLogin(false); }}>Sign Up</button>
                <button onClick={() => { setIsLogin(true); setIsSignUp(false); }}>Log In</button>
            </div>
            {isSignUp ? <SignUp /> : ""}
            {isLogin ? <Login /> : ""}
        </>
    )

}