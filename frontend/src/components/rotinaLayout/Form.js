import axios from "axios";
import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";

const URL = "http://localhost:8800/rotina";

const Form = ({ getRotina, onEdit, setOnEdit, user, userType }) => {
    const ref = useRef();

    useEffect(() => {
      if (onEdit) {
        const rotina = ref.current;

        rotina.descricao.value = onEdit.nome;
        rotina.data.value = onEdit.data;
        rotina.cpf_aluno.value = onEdit.cpf_aluno;
        rotina.cpf_professor.value = onEdit.cpf_aluno;
      }
    }, [onEdit]);

    const handleSubmit = async (e) => {
      e.preventDefault();

      const professor = ref.current

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
            ativo: rotina.ativo.value,
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
            ativo: rotina.ativo.value,
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
      rotina.ativo.value = true;
      rotina.cpf_aluno.value = "";
      rotina.cpf_professor.value = "";

      setOnEdit(null);
      getProfessor();
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