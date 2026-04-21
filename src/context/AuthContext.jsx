import React, { useState, useContext, createContext, useEffect } from "react";

export const AuthContext = createContext();
export  function AuthProvider({ children }) {
    const [token, setToken] = useState(null);

    useEffect(() => {
        const StoredToken = localStorage.getItem("token");
        if (StoredToken) { setToken(StoredToken) }
    }, [])

    const login = (token) => {
        localStorage.setItem("token", token);
        setToken(token);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}