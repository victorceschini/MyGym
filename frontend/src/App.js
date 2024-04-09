import React, { useState } from "react";
import Login from "./components/Login.js";
import Home from "./components/Home/Home.js";
import Aluno from "./components/Aluno.js";
import Plano from "./components/Plano.js";
import Frequencia from "./components/Frequencia.js";
import Aula from "./components/Aula.js";
import Professor from "./components/Professor.js";
import Avaliacao from "./components/Avaliacao.js";
import HomeAluno from "./components/Home/HomeAluno.js";
import Rotina from "./components/Rotina.js";
import Exercicio from "./components/Exercicio.js";

function App() {
    const [user, setUser] = useState(null);
    const [userType, setUserType] = useState(null);
    const [currentPage, setCurrentPage] = useState("Login");

    const handleLoginNavigation = (admin) => {
        setUser({ admin });
        setUserType("admin");
        setCurrentPage("Home");
    };

    const handleAlunoLoginNavigation = (aluno) => {
        setUser({ aluno });
        setUserType("aluno");
        setCurrentPage("HomeAluno");
    };

    const handleNavigation = (page) => {
        setCurrentPage(page);
    };

    const handleReset = () => {
        setUser(null);
        setUserType(null);
        setCurrentPage("Login");
    };

    return (
        <div className="App">
            {currentPage === "Login" && (
                <Login
                    handleLoginNavigation={handleLoginNavigation}
                    handleAlunoLoginNavigation={handleAlunoLoginNavigation}
                />
            )}
            {currentPage === "Home" && (
                <Home
                    handleNavigation={handleNavigation}
                    handleReset={handleReset}
                />
            )}
            {currentPage === "Aluno" && (
                <Aluno
                    handleNavigation={handleNavigation}
                    user={user}
                    userType={userType}
                />
            )}
            {currentPage === "Plano" && (
                <Plano
                    handleNavigation={handleNavigation}
                    user={user}
                    userType={userType}
                />
            )}
            {currentPage === "Frequencia" && (
                <Frequencia
                    handleNavigation={handleNavigation}
                    user={user}
                    userType={userType}
                />
            )}
            {currentPage === "Aula" && (
                <Aula
                    handleNavigation={handleNavigation}
                    user={user}
                    userType={userType}
                />
            )}
            {currentPage === "Professor" && (
                <Professor
                    handleNavigation={handleNavigation}
                    user={user}
                    userType={userType}
                />
            )}
            {currentPage === "Avaliacao" && (
                <Avaliacao
                    handleNavigation={handleNavigation}
                    user={user}
                    userType={userType}
                />
            )}
            {currentPage === "Rotina" && (
                <Rotina
                    handleNavigation={handleNavigation}
                    user={user}
                    userType={userType}
                />
            )}
            {currentPage === "Exercicio" && (
                <Exercicio
                    handleNavigation={handleNavigation}
                    handleReset={handleReset}
                />
            )}
            {currentPage === "HomeAluno" && (
                <HomeAluno
                    handleNavigation={handleNavigation}
                    handleReset={handleReset}
                />
            )}
        </div>
    );
}

export default App;
