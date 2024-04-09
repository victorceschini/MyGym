import React from "react";
import styled from "styled-components";
import logo from "../../styles/logo.png";
import LoginStyles from "../../styles/login";

const Container = styled.div`
    background-color: #9f9da7; /* Cor de fundo cinza */
    height: 100vh; /* Altura total da viewport */
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ContentContainer = styled.div`
    background-color: #fff; /* Cor de fundo branco */
    padding: 40px;
    border-radius: 8px;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1); /* Sombra */
    display: flex;
    flex-direction: column; /* Ajuste para alinhar os elementos verticalmente */
    align-items: center; /* Centralizar os elementos horizontalmente */
`;

const Logo = styled.img`
    width: 200px;
    height: auto;
    margin-bottom: 30px;
`;

const Title = styled.h2`
    margin-bottom: 60px;
`;

const ButtonGroup = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 30px;
`;

const Button = styled.button`
    padding: 15px 30px;
    margin: 10px;
    font-size: 18px;
    border: none;
    border-radius: 5px;
    background-color: #e8491d; /* Cor vermelha */
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #bf3913; /* Cor vermelha mais escura */
    }
`;

const LogoutButton = styled.button`
    position: absolute;
    top: 20px;
    left: 10px;
    padding: 10px;
    background-color: #bf3913; /* Cor vermelha */
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

const HomeAluno = ({ handleNavigation }) => {
    const handleLogout = async (e) => {
        e.preventDefault();
        handleNavigation("Login");
    };

    return (
        <>
            <LoginStyles />
            <Container>
                <ContentContainer>
                    <LogoutButton
                        type="button"
                        onClick={(e) => handleLogout(e)}
                    >
                        Logout
                    </LogoutButton>
                    <Logo src={logo} alt="Logo da academia" />
                    <Title>Bem-vindo</Title>
                    <ButtonGroup>
                        <Button onClick={() => handleNavigation("Aluno")}>
                            Alunos
                        </Button>
                        <Button onClick={() => handleNavigation("Plano")}>
                            Planos
                        </Button>
                        <Button onClick={() => handleNavigation("Frequencia")}>
                            Frequência
                        </Button>
                    </ButtonGroup>
                    <ButtonGroup>
                        <Button
                            onClick={() => handleNavigation("RotinaExercicio")}
                        >
                            Rotina
                        </Button>
                        <Button onClick={() => handleNavigation("Aula")}>
                            Aulas
                        </Button>
                        <Button onClick={() => handleNavigation("Avaliacao")}>
                            Avaliacao
                        </Button>
                    </ButtonGroup>
                    <ButtonGroup>
                    <Button onClick={() => handleNavigation("Rotina")}>
                            Rotina
                    </Button>
                    </ButtonGroup>
                </ContentContainer>
            </Container>
        </>
    );
};

export default HomeAluno;
