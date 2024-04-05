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
  background-color: #e8491d;
  color: white;
  height: 42px;
`;

const Form = ({ getAluno, onEdit, setOnEdit, admin }) => {
    const ref = useRef();

    useEffect(() => {
      if (onEdit) {
        const aluno = ref.current;

        aluno.nome.value = onEdit.nome;
        aluno.email.value = onEdit.email;
        aluno.telefone.value = onEdit.telefone;
        aluno.cpf.value = onEdit.cpf;
        aluno.estado.value = onEdit.estado;
        aluno.cidade.value = onEdit.cidade;
        aluno.cep.value = onEdit.cep;
        aluno.bairro.value = onEdit.bairro;
        aluno.logradouro.value = onEdit.logradouro;
      }
    }, [onEdit]);

    const handleSubmit = async (e) => {
      e.preventDefault();

      const aluno = ref.current

      if (
        !aluno.nome.value ||
        !aluno.email.value ||
        !aluno.cpf.value ||
        !aluno.estado.value ||
        !aluno.cidade.value ||
        !aluno.cep.value ||
        !aluno.bairro.value ||
        !aluno.logradouro.value
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
            estado: aluno.estado.value,
            cidade: aluno.cidade.value,
            cep: aluno.cep.value,
            bairro: aluno.bairro.value,
            logradouro: aluno.logradouro.value,
          })
          .then(({ data }) => toast.success(data))
          .catch((error) => {
            if (error.response.status === 400) {
                toast.error(error.response.data.error);
            } else {
                toast.error("Erro ao tentar atualizar o aluno.");
            }
        });
      } else {
        await axios
          .post(URL, {
            nome: aluno.nome.value,
            email: aluno.email.value,
            telefone: aluno.telefone.value,
            cpf: aluno.cpf.value,
            estado: aluno.estado.value,
            cidade: aluno.cidade.value,
            cep: aluno.cep.value,
            bairro: aluno.bairro.value,
            logradouro: aluno.logradouro.value,
            administrador_id: admin.admin.id,
          })
          .then(({ data }) => toast.success(data))
          .catch((error) => {
            if (error.response.status === 400) {
                toast.error(error.response.data.error);
            } else {
                toast.error("Erro ao tentar registrar o aluno.");
            }
        });
      }

      aluno.nome.value = "";
      aluno.email.value = "";
      aluno.telefone.value = "";
      aluno.cpf.value = "";
      aluno.estado.value = "";
      aluno.cidade.value = "";
      aluno.cep.value = "";
      aluno.bairro.value = "";
      aluno.logradouro.value = "";

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

            <InputArea>
                <Label >Estado</Label>
                <Input name="estado" />
            </InputArea>
            <InputArea>
                <Label >Cidade</Label>
                <Input name="cidade" />
            </InputArea>
            <InputArea>
                <Label >CEP</Label>
                <Input name="cep" />
            </InputArea>
            <InputArea>
                <Label >Bairro</Label>
                <Input name="bairro" />
            </InputArea>
            <InputArea>
                <Label >Logradouro</Label>
                <Input name="logradouro" />
            </InputArea>

            <Button type="submit">SALVAR</Button>
        </FormContainer>
    );
};

export default Form;