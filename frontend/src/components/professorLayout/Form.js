import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const URL = "http://localhost:8800/professor";

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

const Form = ({ getProfessor, onEdit, setOnEdit, user, userType }) => {
    const ref = useRef();

    useEffect(() => {
      if (onEdit) {
        const professor = ref.current;

        professor.nome.value = onEdit.nome;
        professor.email.value = onEdit.email;
        professor.senha.value = onEdit.senha;
        professor.telefone.value = onEdit.telefone;
        professor.cpf.value = onEdit.cpf;
        professor.formacao.value = onEdit.formacao;
        professor.estado.value = onEdit.estado;
        professor.cidade.value = onEdit.cidade;
        professor.cep.value = onEdit.cep;
        professor.bairro.value = onEdit.bairro;
        professor.logradouro.value = onEdit.logradouro;
      }
    }, [onEdit]);

    const handleSubmit = async (e) => {
      e.preventDefault();

      const professor = ref.current

      if (
        !professor.nome.value ||
        !professor.email.value ||
        !professor.senha.value ||
        !professor.cpf.value ||
        !professor.formacao.value ||
        !professor.estado.value ||
        !professor.cidade.value ||
        !professor.cep.value ||
        !professor.bairro.value ||
        !professor.logradouro.value
      ) {
        return toast.warn("Preencha todos os campos!");
      }

      if (onEdit) {
        await axios
          .put(URL + onEdit.id, {
            nome: professor.nome.value,
            email: professor.email.value,
            senha: professor.senha.value,
            telefone: professor.telefone.value,
            cpf: professor.cpf.value,
            formacaoAcademica: professor.formacao.value,
            estado: professor.estado.value,
            cidade: professor.cidade.value,
            cep: professor.cep.value,
            bairro: professor.bairro.value,
            logradouro: professor.logradouro.value,
          })
          .then(({ data }) => toast.success(data))
          .catch((error) => {
            if (error.response.status === 400) {
                toast.error(error.response.data.error);
            } else {
                toast.error("Erro ao tentar atualizar o professor.");
            }
        });
      } else {
        if (userType !== "admin") {
          return toast.error("Não tem permissão para criar professores.");
        }

        await axios
          .post(URL, {
            nome: professor.nome.value,
            email: professor.email.value,
            senha: professor.senha.value,
            telefone: professor.telefone.value,
            cpf: professor.cpf.value,
            formacaoAcademica: professor.formacao.value,
            estado: professor.estado.value,
            cidade: professor.cidade.value,
            cep: professor.cep.value,
            bairro: professor.bairro.value,
            logradouro: professor.logradouro.value,
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

      professor.nome.value = "";
      professor.email.value = "";
      professor.senha.value = "";
      professor.telefone.value = "";
      professor.cpf.value = "";
      professor.formacao.value = "";
      professor.estado.value = "";
      professor.cidade.value = "";
      professor.cep.value = "";
      professor.bairro.value = "";
      professor.logradouro.value = "";

      setOnEdit(null);
      getProfessor();
    };

    return (
        <FormContainer ref={ref} onSubmit={handleSubmit}>
            <InputArea>
                <Label >Nome</Label>
                <Input name="nome" />
            </InputArea>
            <InputArea>
                <Label >Formação</Label>
                <Input name="formacao" />
            </InputArea>
            <InputArea>
                <Label >CPF</Label>
                <Input name="cpf" />
            </InputArea>
            <InputArea>
                <Label >Telefone</Label>
                <Input name="telefone" />
            </InputArea>
            <InputArea>
                <Label >E-mail</Label>
                <Input name="email" type="email" />
            </InputArea>
            <InputArea>
                <Label >Senha</Label>
                <Input name="senha" />
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