import GlobalStyle from "../styles/global";
import styled from "styled-components";
import Form from "./frequenciaLayout/Form.js";
import Grid from "./frequenciaLayout/Grid.js";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const URL = "http://localhost:8800/frequencia";

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

function Frequencia({ handleNavigation }){
    const [frequencia, setFrequencia] = useState([]);
    const [onEdit, setOnEdit] = useState(null);
  
    const getFrequencia = async () => {
      try {
        const res = await axios.get(URL);
        setFrequencia(res.data.sort((a, b) => (a.checkOut > b.checkOut ? 1 : -1)));
      } catch (error) {
        toast.error(error);
      }
    };
  
    useEffect(() => {
      getFrequencia();
    }, [setFrequencia]);

    const handleReturn = async (e) => {
      e.preventDefault();
      handleNavigation("Home");
    };
  
    return (
      <>
        <Container>
          <Title>FREQUENCIAS</Title>
          <ReturnButton type="button" onClick={(e) => handleReturn(e)}>
            Retornar
          </ReturnButton>
          <Form onEdit={onEdit} setOnEdit={setOnEdit} getFrequencia={getFrequencia} />
          <Grid setOnEdit={setOnEdit} frequencia={frequencia} setFrequencia={setFrequencia} />
        </Container>
        
        <ToastContainer autoClose={3000} position={"bottom-left"} />
        <GlobalStyle />
      </>
    );
  }

  export default Frequencia;
