import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const URL = "http://localhost:8800/plano";

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

const Form = ({ getPlano, onEdit, setOnEdit}) => {
    const ref = useRef();

    useEffect(() => {
      if (onEdit) {
        const plano = ref.current;

        plano.nome.value = onEdit.nome;
        plano.valor.value = onEdit.valor;
        plano.descricao.value = onEdit.descricao;
        plano.cpf.value = onEdit.cpf;
      }
    }, [onEdit]);

    const handleSubmit = async (e) => {
      e.preventDefault();

      const plano = ref.current

      if (
        !plano.nome.value ||
        !plano.valor.value ||
        !plano.descricao.value ||
        !plano.cpf.value
      ) {
        return toast.warn("Preencha todos os campos!");
      }

      if (onEdit) {
        await axios
          .put(URL + onEdit.id, {
            nome: plano.nome.value,
            valor: plano.valor.value,
            descricao: plano.descricao.value,
            cpf: plano.cpf.value,
          })
          .then(({ data }) => toast.success(data))
          .catch((error) => {
            if (error.response.status === 400) {
                toast.error(error.response.data.error);
            } else {
                toast.error("Erro ao tentar atualizar o plano.");
            }
        });
      } else {
        await axios
          .post(URL, {
            nome: plano.nome.value,
            valor: plano.valor.value,
            descricao: plano.descricao.value,
            cpf: plano.cpf.value,
          })
          .then(({ data }) => toast.success(data))
          .catch((error) => {
            if (error.response.status === 400) {
                toast.error(error.response.data.error);
            } else {
                toast.error("Erro ao tentar registrar o plano.");
            }
        });
      }

      plano.nome.value = "";
      plano.valor.value = "";
      plano.descricao.value = "";
      plano.cpf.value = "";

      setOnEdit(null);
      getPlano();
    };

    return (
        <FormContainer ref={ref} onSubmit={handleSubmit}>
            <InputArea>
                <Label >Nome</Label>
                <Input name="nome" />
            </InputArea>
            <InputArea>
                <Label >Valor</Label>
                <Input name="valor" />
            </InputArea>
            <InputArea>
                <Label >Descrição</Label>
                <Input name="descricao" />
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