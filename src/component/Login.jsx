import React, { useContext, useEffect, useState } from "react";
import axios from 'axios'

import { AuthContext } from "../context/AuthContext";

export default function Login() {
    const [userData, setUserDate] = useState({})

    const { login } = useContext(AuthContext);

    const authenticateUser = async () => {
        const response = await axios.post("https://notes-qpy7.onrender.com/api/auth/authenticate", userData)
        console.log(response);
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
                <button onClick={() => authenticateUser()}>
                    authenticate User
                </button>
            </div>

        </>
    )
}