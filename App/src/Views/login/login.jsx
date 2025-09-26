import React, { useState } from "react";
import "./login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Email:", email);
        console.log("Password:", password);
    };

    return (
        <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
            <h2 className="login-title">Iniciar Sesión</h2>
            <div className="input-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
                type="email"
                id="email"
                placeholder="Ingresa tu correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            <a href="#" className="forgot-password">
            ¿Olvidaste tu contraseña?
            </a>
        </form>
        </div>
    );
};

export default Login;
