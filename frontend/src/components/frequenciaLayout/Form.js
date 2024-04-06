import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const URL = "http://localhost:8800/frequencia";

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

const Form = ({ getFrequencia, onEdit, setOnEdit}) => {
    const ref = useRef();

    useEffect(() => {
      if (onEdit) {
        const frequencia = ref.current;

        frequencia.cpf.value = onEdit.cpf;
      }
    }, [onEdit]);

    const handleSubmit = async (e) => {
      e.preventDefault();

      const frequencia = ref.current

      if (
        !frequencia.cpf.value
      ) {
        return toast.warn("Preencha todos os campos!");
      }
      /*
      if (onEdit) {
        await axios
          .put(URL + onEdit.id, {
            cpf: frequencia.cpf.value,
          })
          .then(({ data }) => toast.success(data))
          .catch((error) => {
            if (error.response.status === 400) {
                toast.error(error.response.data.error);
            } else {
                toast.error("Erro ao tentar atualizar a frequência.");
            }
        });
      } */else {
        await axios
          .post(URL, {
            cpf: frequencia.cpf.value,
          })
          .then(({ data }) => toast.success(data))
          .catch((error) => {
            if (error.response.status === 400) {
                toast.error(error.response.data.error);
            } else {
                toast.error("Erro ao tentar registrar a frequência.");
            }
        });
      }

      frequencia.cpf.value = "";

      setOnEdit(null);
      getFrequencia();
    };

    return (
        <FormContainer ref={ref} onSubmit={handleSubmit}>
            <InputArea>
                <Label >CPF</Label>
                <Input name="cpf" />
            </InputArea>

            <Button type="submit">CHECK-IN</Button>
        </FormContainer>
    );
};

export default Form;