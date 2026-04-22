import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function Login() {
    const [userData, setUserData] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { login } = useContext(AuthContext);

    const sleep = (ms) => new Promise(res => setTimeout(res, ms));

    const authenticateUser = async () => {
        if (!userData.username || !userData.password) {
            toast.error("Username and password are required");
            return;
        }

        setIsSubmitting(true);
        const toastId = toast.loading("Logging in...");

        try {
            for (let attempt = 0; attempt < 3; attempt++) {
                try {
                    const response = await axios.post(
                        "https://notes-qpy7.onrender.com/api/auth/authenticate",
                        userData
                    );

                    login(response.data.token);

                    toast.update(toastId, {
                        render: "Login successful 🎉",
                        type: "success",
                        isLoading: false,
                        autoClose: 2000
                    });

                    return;

                } catch (err) {
                    if (attempt === 2) {
                        toast.update(toastId, {
                            render: "Login failed. Try again later.",
                            type: "error",
                            isLoading: false,
                            autoClose: 2000
                        });
                    } else {
                        await sleep(1500);
                    }
                }
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="form-group">
            <input
                type="text"
                placeholder="username"
                onChange={(e) =>
                    setUserData(prev => ({ ...prev, username: e.target.value }))
                }
            />

            <input
                type="password"
                placeholder="password"
                onChange={(e) =>
                    setUserData(prev => ({ ...prev, password: e.target.value }))
                }
            />

            <button className="btn-primary" onClick={authenticateUser} disabled={isSubmitting}>
                {isSubmitting ? "Logging in..." : "Login"}
            </button>
        </div>
    );
}