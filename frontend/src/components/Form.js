import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const URL = "http://localhost:8800/aluno";

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
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const Form = ({ getAluno, onEdit, setOnEdit }) => {
    const ref = useRef();

    useEffect(() => {
      if (onEdit) {
        const aluno = ref.current;

        aluno.nome.value = onEdit.nome;
        aluno.email.value = onEdit.email;
        aluno.telefone.value = onEdit.telefone;
        aluno.cpf.value = onEdit.cpf;
      }
    }, [onEdit]);

    const handleSubmit = async (e) => {
      e.preventDefault();

      const aluno = ref.current

      if (
        !aluno.nome.value ||
        !aluno.email.value ||
        !aluno.telefone.value ||
        !aluno.cpf.value
      ) {
        return toast.warn("Preencha todos os campos!");
      }

      if (onEdit) {
        await axios
          .put(URL + onEdit.id, {
            nome: aluno.nome.value,
            email: aluno.email.value,
            telefone: aluno.telefone.value,
            cpf: aluno.cpf.value,
          })
          .then(({ data }) => toast.success(data))
          .catch(({ data }) => toast.error(data));
      } else {
        await axios
          .post(URL, {
            nome: aluno.nome.value,
            email: aluno.email.value,
            telefone: aluno.telefone.value,
            cpf: aluno.cpf.value,
          })
          .then(({ data }) => toast.success(data))
          .catch(({ data }) => toast.error(data));
      }

      aluno.nome.value = "";
      aluno.email.value = "";
      aluno.telefone.value = "";
      aluno.cpf.value = "";

      setOnEdit(null);
      getAluno();
    };

    return (
        <FormContainer ref={ref} onSubmit={handleSubmit}>
            <InputArea>
                <Label >Nome</Label>
                <Input name="nome" />
            </InputArea>
            <InputArea>
                <Label >E-mail</Label>
                <Input name="email" type="email" />
            </InputArea>
            <InputArea>
                <Label >Telefone</Label>
                <Input name="telefone" />
            </InputArea>
            <InputArea>
                <Label >CPF</Label>
                <Input name="cpf" />
            </InputArea>

            <Button type="submit">SALVAR</Button>
        </FormContainer>
    );
};

export default Form;