import React, { useContext, useEffect, useState } from "react";
import axios from 'axios'
import { AuthContext } from "../context/AuthContext";

export default function SignUp() {
    const [userData, setUserDate] = useState({});
   const { login } = useContext(AuthContext);


    const registerUser = async () => {
        const response = await axios.post("https://notes-qpy7.onrender.com/api/auth/register", userData)
        console.log(response)
        login(response.data.token);
    }

    return (
        <>
            <div className="signup">
                <input
                    id="username"
                    className=""
                    type="text"
                    onChange={(e) => setUserDate(prev => ({ ...prev, username: e.target.value }))}
                    placeholder="username"
                />

                <input
                    id="password"
                    className=""
                    type="text"
                    onChange={(e) => setUserDate(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="password"
                />

                <input
                    id= "role"
                    className=""
                    type="text"
                    onChange={(e) => setUserDate(prev => ({ ...prev, role: e.target.value }))}
                    placeholder="role"
                />

                <button onClick={() => registerUser()}>
                    Create User
                </button>
            </div>

        </>
    )
}