import React, { useState } from "react";
import Login from "./components/Login.js";
import Home from "./components/Home.js";
import Aluno from "./components/Aluno.js";
import Plano from "./components/Plano.js";
import Frequencia from "./components/Frequencia.js";

function App() {
  const [admin, setAdmin] = useState(null);
  const [currentPage, setCurrentPage] = useState("Login");

  const handleLoginNavigation = (admin) => {
    setAdmin({ admin });
    setCurrentPage("Home");
  };

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="App">
      {currentPage === "Login" && <Login handleLoginNavigation={handleLoginNavigation} />}
      {currentPage === "Home" && <Home handleNavigation={handleNavigation} />}
      {currentPage === "Aluno" && <Aluno handleNavigation={handleNavigation} admin={admin} />}
      {currentPage === "Plano" && <Plano handleNavigation={handleNavigation}/>}
      {currentPage === "Frequencia" && <Frequencia handleNavigation={handleNavigation}/>}
    </div>
  );
}

export default App;
