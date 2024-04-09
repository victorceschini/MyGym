import GlobalStyle from "../styles/global";
import styled from "styled-components";
import Form from "./avaliacaoLayout/Form";
import Grid from "./avaliacaoLayout/Grid";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const URL = "http://localhost:8800/avaliacao";

const Container = styled.div`
    width: 100%;
    max-width: 800px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
`;

const ReturnButton = styled.button`
    position: absolute;
    top: 20px;
    left: 10px;
    padding: 10px;
    background-color: #bf3913;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

const Title = styled.h2``;

function Avaliacao({ handleNavigation, user, userType }) {
    const [avaliacao, setAvaliacao] = useState([]);
    const [onEdit, setOnEdit] = useState(null);

    const getAvaliacao = async () => {
        try {
            const res = await axios.get(URL);
            setAvaliacao(res.data.sort((a, b) => (a.id > b.id ? 1 : -1)));
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        getAvaliacao();
    }, []); // Corrigido para executar apenas uma vez na montagem do componente

    const handleReturn = (e) => {
        e.preventDefault();
        if (userType === "admin") {
            handleNavigation("Home");
        } else if (userType === "aluno") {
            handleNavigation("HomeAluno");
        }
    };

    return (
        <>
            <Container>
                <Title>Avaliacao</Title>
                <ReturnButton onClick={handleReturn}>Retornar</ReturnButton>
                {userType !== "aluno" && (
                    <Form
                        onEdit={onEdit}
                        setOnEdit={setOnEdit}
                        getAvaliacao={getAvaliacao}
                        user={user}
                    />
                )}
                <Grid
                    setOnEdit={setOnEdit}
                    avaliacao={avaliacao}
                    setAvaliacao={setAvaliacao}
                    user={user}
                    userType={userType}
                />
            </Container>
            <ToastContainer autoClose={3000} position="bottom-left" />
            <GlobalStyle />
        </>
    );
}

export default Avaliacao;
