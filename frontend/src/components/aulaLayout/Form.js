import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const URL = "http://localhost:8800/aula";

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
  margin: auto;
  margin-top: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #e8491d;
  color: white;
  height: 42px;
`;

const Form = ({ getAula, onEdit, setOnEdit, user}) => {
    const ref = useRef();

    useEffect(() => {
      if (onEdit) {
        const aula = ref.current;

        aula.modalidade.value = onEdit.modalidade;
        aula.dias.value = onEdit.dias;
        aula.descricao.value = onEdit.descricao;
        aula.local.value = onEdit.local;
        aula.professor_id.value = onEdit.professor_id;
      }
    }, [onEdit]);

    const handleSubmit = async (e) => {
      e.preventDefault();

      const aula = ref.current

      if (
        !aula.modalidade.value ||
        !aula.dias.value ||
        !aula.descricao.value ||
        !aula.local.value ||
        !aula.professor_id.value
      ) {
        return toast.warn("Preencha todos os campos!");
      }

      if (onEdit) {
        await axios
          .put(URL + onEdit.id, {
            modalidade: aula.modalidade.value,
            dias: aula.dias.value,
            descricao: aula.descricao.value,
            local: aula.local.value,
            professor_id: aula.professor_id.value,
          })
          .then(({ data }) => toast.success(data))
          .catch((error) => {
            if (error.response.status === 400) {
                toast.error(error.response.data.error);
            } else {
                toast.error("Erro ao tentar atualizar a aula.");
            }
        });
      } else {
        await axios
          .post(URL, {
            modalidade: aula.modalidade.value,
            dias: aula.dias.value,
            descricao: aula.descricao.value,
            local: aula.local.value,
            professor_id: aula.professor_id.value,
            administrador_id: user.admin.id,
          })
          .then(({ data }) => toast.success(data))
          .catch((error) => {
            if (error.response.status === 400) {
                toast.error(error.response.data.error);
            } else {
                toast.error("Erro ao tentar registrar a aula.");
            }
        });
      }

      aula.modalidade.value = "";
      aula.dias.value = "";
      aula.descricao.value = "";
      aula.local.value = "";
      aula.professor_id.value = "";

      setOnEdit(null);
      getAula();
    };

    return (
        <FormContainer ref={ref} onSubmit={handleSubmit}>
            <InputArea>
                <Label >Modalidade</Label>
                <Input name="modalidade" />
            </InputArea>
            <InputArea>
                <Label >Dias</Label>
                <Input name="dias" />
            </InputArea>
            <InputArea>
                <Label >Descrição</Label>
                <Input name="descricao" />
            </InputArea>
            <InputArea>
                <Label >Local</Label>
                <Input name="local" />
            </InputArea>
            <InputArea>
                <Label >Id do Professor</Label>
                <Input name="professor_id" />
            </InputArea>

            <Button type="submit">SALVAR</Button>
        </FormContainer>
    );
};

export default Form;