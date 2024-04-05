import GlobalStyle from "../styles/global";
import styled from "styled-components";
import Form from "./alunoLayout/Form.js";
import Grid from "./alunoLayout/Grid.js";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const URL = "http://localhost:8800/aluno";

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

function Aluno({ handleNavigation, admin }){
    const [aluno, setAluno] = useState([]);
    const [onEdit, setOnEdit] = useState(null);
  
    const getAluno = async () => {
      try {
        const res = await axios.get(URL);
        setAluno(res.data.sort((a, b) => (a.id > b.id ? 1 : -1)));
      } catch (error) {
        toast.error(error);
      }
    };
  
    useEffect(() => {
      getAluno();
    }, [setAluno]);

    const handleReturn = async (e) => {
      e.preventDefault();
      handleNavigation("Home");
    };
  
    return (
      <>
        <Container>
          <Title>ALUNOS</Title>
          <ReturnButton type="button" onClick={(e) => handleReturn(e)}>
            Retornar
          </ReturnButton>
          <Form onEdit={onEdit} setOnEdit={setOnEdit} getAluno={getAluno} admin={admin} />
          <Grid setOnEdit={setOnEdit} aluno={aluno} setAluno={setAluno} />
          
        </Container>
        
        <ToastContainer autoClose={3000} position={"bottom-left"} />
        <GlobalStyle />
      </>
    );
  }

  export default Aluno;
