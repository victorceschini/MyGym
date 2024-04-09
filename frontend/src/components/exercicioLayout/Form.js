import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const URL = "http://localhost:8800/exercicio";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;


const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  margin-left: 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label`
  margin-left: 10px;
`;

const Button = styled.button`
  padding: 10px;
  margin: auto;
  margin-right: 160px;
  margin-top: 20px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #e8491d;
  color: white;
  height: 42px;
`;

const Form = ({ getExercicio, onEdit, setOnEdit, user, userType }) => {
    const ref = useRef();

    useEffect(() => {
      if (onEdit) {
        const exercicio = ref.current;

        exercicio.nome.value = onEdit.nome;
        exercicio.series.value = onEdit.series;
        exercicio.repeticoes.value = onEdit.repeticoes;
        exercicio.intervalo.value = onEdit.intervalo;
      }
    }, [onEdit]);

    const handleSubmit = async (e) => {
      e.preventDefault();

      const exercicio = ref.current

      if (
        !exercicio.nome.value ||
        !exercicio.series.value ||
        !exercicio.repeticoes.value ||
        !exercicio.intervalo.value 
      ) {
        return toast.warn("Preencha todos os campos!");
      }

      if (onEdit) {
        await axios
          .put(URL + onEdit.id, {
            nome: exercicio.nome.value,
            series: exercicio.series.value,
            repeticoes: exercicio.repeticoes.value,
            intervalo: exercicio.intervalo.value,
          })
          .then(({ data }) => toast.success(data))
          .catch((error) => {
            if (error.response.status === 400) {
                toast.error(error.response.data.error);
            } else {
                toast.error("Erro ao tentar atualizar a exercicio.");
            }
        });
      } else {
        if (userType !== "admin") {
          return toast.error("Não tem permissão para criar exercicio.");
        }

        await axios
          .post(URL, {
            nome: exercicio.nome.value,
            series: exercicio.series.value,
            repeticoes: exercicio.repeticoes.value,
            intervalo: exercicio.intervalo.value,
          })
          .then(({ data }) => toast.success(data))
          .catch((error) => {
            if (error.response.status === 400) {
                toast.error(error.response.data.error);
            } else {
                toast.error("Erro ao tentar registrar o professor.");
            }
        });
      }

      exercicio.nome.value = "";
      exercicio.series.series = null;
      exercicio.repeticoes.value = null;
      exercicio.intervalo.value = null;

      setOnEdit(null);
      getExercicio();
    };

    return (
        <FormContainer ref={ref} onSubmit={handleSubmit}>
            <InputArea>
                <Label >Nome</Label>
                <Input name="nome" />
            </InputArea>
            <InputArea>
                <Label >Series</Label>
                <Input name="series" type="number" />
            </InputArea>
            <InputArea>
                <Label >Repetições</Label>
                <Input name="repeticoes" type="number" />
            </InputArea>
            <InputArea>
                <Label >Intervalo</Label>
                <Input name="intervalo" type="number" />
            </InputArea>
            <Button type="submit">SALVAR</Button>
        </FormContainer>
    );
};

export default Form;