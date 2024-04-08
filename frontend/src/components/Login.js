import LoginStyles from '../styles/login';
import logo from '../styles/logo.png';
import { useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

function Login({ handleLoginNavigation, handleAlunoLoginNavigation }) {
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.post("http://localhost:8800/login", 
                JSON.stringify({username, password}),
                {
                    headers: { "Content-Type": "application/json" }
                }
            );
            
            const userType = response.data.userType;
            if (userType === "admin") {
                handleLoginNavigation(response.data.user);
            } else if (userType === "aluno") {
                handleAlunoLoginNavigation(response.data.user); // Função para navegação de aluno
            }

        } catch (error) {
            if (!error?.response) {
                toast.error("Erro ao entrar no sistema");
            } else if (error.response.status === 401) {
                toast.error("Usuário e/ou senha inválidos");
            }
        }
    };

    return (
      <div className="login-form-wrap">
        <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
        </div>
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
        </div>
        <LoginStyles />
        <ToastContainer autoClose={3000} position={"bottom-left"} />
      </div>
    )
}

export default Login;