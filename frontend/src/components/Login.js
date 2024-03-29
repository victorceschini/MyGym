import LoginStyles from '../styles/login';
import { useState } from 'react';
import axios from "axios";

function Login({ setUser }) {
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.post("http://localhost:8800/login", 
                JSON.stringify({username, password}),
                {
                    headers: { "Content-Type": "application/json" }
                }
            );

            setUser(response.data); // Define o usuário após a autenticação

        } catch (error) {
            if (!error?.response) {
                setError("Erro ao entrar no sistema");
            } else if (error.response.status === 401) {
                setError("Usuário e/ou senha inválidos");
            }
        }
    };

    return (
      <div className="login-form-wrap">
        <div>
            <h2>Login</h2>
            <form className="login-form">
            <input type="username" 
                    name="username" 
                    placeholder="Usuário" 
                    required
                    onChange={(e) => setUsername(e.target.value)}/>
            <input type="password" 
                    name="password" 
                    placeholder="Senha" 
                    required
                    onChange={(e) => setPassword(e.target.value)}/>
            <button type="submit" 
                    className="btn-login"
                    onClick={(e) => handleLogin(e)}>Entrar</button>
            </form>
            <p>{error}</p>
        </div>
        <LoginStyles />
      </div>
    )
}

export default Login;