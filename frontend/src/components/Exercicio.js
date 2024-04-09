import GlobalStyle from "../styles/global";
import styled from "styled-components";
import Form from "./exercicioLayout/Form.js";
import Grid from "./exercicioLayout/Grid.js";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const URL = "http://localhost:8800/exercicio";

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

function Exercicio({ handleNavigation, user, userType }){
    const [exercicio, setExercicio] = useState([]);
    const [onEdit, setOnEdit] = useState(null);
  
    const getExercicio = async () => {
      try {
        const res = await axios.get(URL);
        setExercicio(res.data.sort((a, b) => (a.id > b.id ? 1 : -1)));
      } catch (error) {
        toast.error(error);
      }
    };
  
    useEffect(() => {
      getExercicio();
    }, [setExercicio]);

    const handleReturn = async (e) => {
      e.preventDefault();
      if(userType === "admin")
      {
        handleNavigation("Home");
      } else if(userType === "aluno"){
        handleNavigation("HomeAluno");
      }
    };
  
    return (
      <>
        <Container>
          <Title>EXERCÍCIOS</Title>
          <ReturnButton type="button" onClick={(e) => handleReturn(e)}>
            Retornar
          </ReturnButton>
          {userType !== "aluno" && (
          <Form onEdit={onEdit} setOnEdit={setOnEdit} getExercicio={getExercicio} user={user} userType={userType} />)}
          <Grid setOnEdit={setOnEdit} exercicio={exercicio} setExercicio={setExercicio} user={user} userType={userType} />
          
        </Container>
        
        <ToastContainer autoClose={3000} position={"bottom-left"} />
        <GlobalStyle />
      </>
    );
  }

  export default Exercicio;