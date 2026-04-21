import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function SignUp() {
    const [userData, setUserData] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { login } = useContext(AuthContext);

    const sleep = (ms) => new Promise(res => setTimeout(res, ms));



    const registerUser = async () => {
        if (!userData.username || !userData.password) {
            toast.error("Username and password are required");
            return;
        }

        setIsSubmitting(true);

        const toastId = toast.loading("Signing Up...");

        try {
            for (let attempt = 0; attempt < 3; attempt++) {
                try {
                    const response = await axios.post(
                        "https://notes-qpy7.onrender.com/api/auth/register",
                        userData
                    );

                    toast.update(toastId, {
                        render: "Signup successful 🎉",
                        type: "success",
                        isLoading: false,
                        autoClose: 3000
                    });

                    login(response.data.token);
                    return;

                } catch (err) {
                    if (attempt === 2) {
                        toast.update(toastId, {
                            render: "Server is slow or unreachable",
                            type: "error",
                            isLoading: false,
                            autoClose: 4000
                        });
                    } else {
                        await sleep(2000);
                    }
                }
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="signup">
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

            <input
                type="text"
                placeholder="role"
                onChange={(e) =>
                    setUserData(prev => ({ ...prev, role: e.target.value }))
                }
            />

            <button onClick={registerUser} disabled={isSubmitting}>
                {isSubmitting ? "Please wait..." : "Create User"}
            </button>

           
        </div>
    );
}