import GlobalStyle from "../styles/global";
import styled from "styled-components";
import Form from "./aulaLayout/Form.js";
import Grid from "./aulaLayout/Grid.js";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const URL = "http://localhost:8800/aula";

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

function Aula({ handleNavigation, user, userType }){
    const [aula, setAula] = useState([]);
    const [onEdit, setOnEdit] = useState(null);
  
    const getAula = async () => {
      try {
        const res = await axios.get(URL);
        setAula(res.data.sort((a, b) => (a.id > b.id ? 1 : -1)));
      } catch (error) {
        toast.error(error);
      }
    };
  
    useEffect(() => {
      getAula();
    }, [setAula]);

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
          <Title>AULAS</Title>
          <ReturnButton type="button" onClick={(e) => handleReturn(e)}>
            Retornar
          </ReturnButton>
          {userType !== "aluno" && (
            <Form onEdit={onEdit} setOnEdit={setOnEdit} getAula={getAula} user={user} />
          )}
          
          <Grid setOnEdit={setOnEdit} aula={aula} setAula={setAula} user={user} userType={userType} />
          
        </Container>
        
        <ToastContainer autoClose={3000} position={"bottom-left"} />
        <GlobalStyle />
      </>
    );
  }

  export default Aula;
