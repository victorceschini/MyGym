import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const URL = "http://localhost:8800/rotina";

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

const Form = ({ getRotina, onEdit, setOnEdit, user, userType }) => {
    const ref = useRef();

    useEffect(() => {
      if (onEdit) {
        const rotina = ref.current;

        rotina.descricao.value = onEdit.descricao;
        rotina.data.value = onEdit.data;
        rotina.cpf_aluno.value = onEdit.cpf_aluno;
        rotina.cpf_professor.value = onEdit.cpf_professor;
      }
    }, [onEdit]);

    const handleSubmit = async (e) => {
      e.preventDefault();

      const rotina = ref.current

      if (
        !rotina.descricao.value ||
        !rotina.data.value ||
        !rotina.cpf_aluno.value ||
        !rotina.cpf_professor.value 
      ) {
        return toast.warn("Preencha todos os campos!");
      }

      if (onEdit) {
        await axios
          .put(URL + onEdit.id, {
            descricao: rotina.descricao.value,
            data: rotina.data.value,
            ativo: true,
            cpf_aluno: rotina.cpf_aluno.value,
            cpf_professor: rotina.cpf_professor.value,
          })
          .then(({ data }) => toast.success(data))
          .catch((error) => {
            if (error.response.status === 400) {
                toast.error(error.response.data.error);
            } else {
                toast.error("Erro ao tentar atualizar a rotina.");
            }
        });
      } else {
        if (userType !== "admin") {
          return toast.error("Não tem permissão para criar rotina.");
        }

        await axios
          .post(URL, {
            descricao: rotina.descricao.value,
            data: rotina.data.value,
            ativo: true,
            cpf_aluno: rotina.cpf_aluno.value,
            cpf_professor: rotina.cpf_professor.value,
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

      rotina.descricao.value = "";
      rotina.data.value = "";
      rotina.cpf_aluno.value = "";
      rotina.cpf_professor.value = "";

      setOnEdit(null);
      getRotina();
    };

    return (
        <FormContainer ref={ref} onSubmit={handleSubmit}>
            <InputArea>
                <Label >Descrição</Label>
                <Input name="descricao" type="text" />
            </InputArea>
            <InputArea>
                <Label >Data</Label>
                <Input name="data" type="date" />
            </InputArea>
            <InputArea>
                <Label >CPF do Aluno</Label>
                <Input name="cpf_aluno" />
            </InputArea>
            <InputArea>
                <Label >CPF do Professor</Label>
                <Input name="cpf_professor" />
            </InputArea>
            <Button type="submit">SALVAR</Button>
        </FormContainer>
    );
};

export default Form;