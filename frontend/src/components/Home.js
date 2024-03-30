import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const Title = styled.h2`
  margin-bottom: 30px;
`;

const Button = styled.button`
  padding: 15px 30px;
  margin: 10px;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const LogoutButton = styled.button`
  position: absolute;
  top: 20px;
  left: 10px;
  padding: 10px;
  background-color: #3ca9e2;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const Home = ({ handleNavigation }) => {

    const handleLogout = async (e) => {
        e.preventDefault();
        handleNavigation("Login");
      };

    return (
        <Container>
        <LogoutButton type="button" onClick={(e) => handleLogout(e)}>
            Logout
        </LogoutButton>
        <Title>Bem-vindo à Página Inicial</Title>
        <Button onClick={() => handleNavigation("Aluno")}>Alunos</Button>
        <Button onClick={() => handleNavigation("Plano")}>Planos</Button>
        <Button onClick={() => handleNavigation("Rotina")}>Rotinas</Button>
        <Button onClick={() => handleNavigation("Avaliacao")}>Avaliação</Button>
        <Button onClick={() => handleNavigation("Professor")}>Professores</Button>        
        </Container>
    );
};

export default Home;
