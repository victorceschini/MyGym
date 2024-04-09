import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const URL = "http://localhost:8800/avaliacao";

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

const Form = ({ getAvaliacao, onEdit, setOnEdit, user, userType }) => {
    const ref = useRef();

    useEffect(() => {
        if (onEdit) {
            const avaliacao = ref.current;

            avaliacao.quadril.value = onEdit.quadril;
            avaliacao.abdomen.value = onEdit.abdomen;
            avaliacao.coxa.value = onEdit.coxa;
            avaliacao.panturilha.value = onEdit.panturilha;
            avaliacao.biceps.value = onEdit.biceps;
            avaliacao.antebraco.value = onEdit.antebraco;
            avaliacao.altura.value = onEdit.altura;
            avaliacao.massa.value = onEdit.massa;
            avaliacao.data.value = onEdit.data;
        }
    }, [onEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const avaliacao = ref.curret;
        if (
            !avaliacao.quadril.value ||
            !avaliacao.abdomen.value ||
            !avaliacao.coxa.value ||
            !avaliacao.panturilha.value ||
            !avaliacao.biceps.value ||
            !avaliacao.antebraco.value ||
            !avaliacao.altura.value ||
            !avaliacao.massa.value ||
            !avaliacao.data.value
        ) {
            return toast.warn("Preencha todos os campos!");
        }

        try {
            if (onEdit) {
                await axios
                    .put(URL + onEdit.id, {
                        quadril: avaliacao.quadril.value,
                        abdomen: avaliacao.abdomen.value,
                        coxa: avaliacao.coxa.value,
                        panturilha: avaliacao.panturilha.value,
                        biceps: avaliacao.biceps.value,
                        antebraco: avaliacao.antebraco.value,
                        altura: avaliacao.altura.value,
                        massa: avaliacao.massa.value,
                        data: avaliacao.data.value,
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
                if (userType !== "admin") {
                    return toast.error("Não tem permissão para criar alunos.");
                }

                ref.current.reset();
                setOnEdit(null);
                getAvaliacao();
            }
        } catch (error) {
            toast.error("Erro ao tentar registrar/atualizar a avaliação.");
            console.error(error);
        }

        return (
            <FormContainer ref={ref} onSubmit={handleSubmit}>
                <InputArea>
                    <Label>CPF</Label>
                    <Input name="cpf" />
                </InputArea>

                <Button type="submit">CHECK-IN</Button>
            </FormContainer>
        );
    };
};

export default Form;
