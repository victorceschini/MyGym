import React, { useState } from "react";
import Login from "./components/Login.js";
import Aluno from "./components/Aluno.js";
import Home from "./components/Home.js";

function App() {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState("Login");

  const handleLoginNavigation = (userData) => {
    setUser(userData);
    setCurrentPage("Home");
  };

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="App">
      {currentPage === "Login" && <Login handleLoginNavigation={handleLoginNavigation} />}
      {currentPage === "Aluno" && <Aluno handleNavigation={handleNavigation} />}
      {currentPage === "Home" && <Home handleNavigation={handleNavigation} />}
    </div>
  );
}

export default App;
