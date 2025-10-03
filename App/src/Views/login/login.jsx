import React, { useState } from "react";
import "./login.css";
import apiservice from "../../services/apiservice";

const Login = () => {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async  (e) => {
        e.preventDefault();
        console.log("user:", user);
        console.log("Password:", password);
        
        try {
            const response = await apiservice.post("/auth/login", { user, password });
            console.log("Login successful:", response);

            if(response.success){
                window.location.href = "/licitador";
            }
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
            <h2 className="login-title">Iniciar Sesión</h2>
            <div className="input-group">
            <label htmlFor="user">Usuario</label>
            <input
                type="text"
                id="user"
                placeholder="Ingresa tu usuario"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                required
            />
            </div>
            <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <input
                type="password"
                id="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            </div>
            <button type="submit" className="login-button">
            Iniciar Sesión
            </button>
            <a href="/empresa" className="forgot-password">
            Soy una empresa
            </a>
        </form>
        </div>
    );
};

export default Login;
