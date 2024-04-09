import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const URL = "http://localhost:8800/equipamento";

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

const Form = ({ getEquipamento, onEdit, setOnEdit, user }) => {
    const ref = useRef();

    useEffect(() => {
        if (onEdit) {
            const equipamento = ref.current;

            equipamento.nome.value = onEdit.nome;
            equipamento.ultimaManutencao.value = onEdit.ultimaManutencao;
            equipamento.disponivel.value = onEdit.disponivel;
            equipamento.fornecedor.value = onEdit.fornecedor;
            equipamento.marca.value = onEdit.marca;
            equipamento.administrador_id.value = onEdit.administrador_id;
        }
    }, [onEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const equipamento = ref.current;

        if (
            !equipamento.nome.value ||
            !equipamento.ultimaManutencao.value ||
            !equipamento.disponivel.value ||
            !equipamento.fornecedor.value ||
            !equipamento.marca.value ||
            !equipamento.administrador_id.value
        ) {
            return toast.warn("Preencha todos os campos!");
        }

        if (onEdit) {
            await axios
                .put(URL + onEdit.id, {
                    nome: equipamento.nome.value,
                    ultimaManutencao: equipamento.ultimaManutencao.value,
                    disponivel: equipamento.disponivel.value,
                    fornecedor: equipamento.fornecedor.value,
                    marca: equipamento.marca.value,
                    administrador_id: user.admin.id,
                })
                .then(({ data }) => toast.success(data))
                .catch((error) => {
                    if (error.response.status === 400) {
                        toast.error(error.response.data.error);
                    } else {
                        toast.error("Erro ao tentar atualizar o equipamento.");
                    }
                });
        } else {
            await axios
                .post(URL, {
                    nome: equipamento.nome.value,
                    ultimaManutencao: equipamento.ultimaManutencao.value,
                    disponivel: equipamento.disponivel.value,
                    fornecedor: equipamento.fornecedor.value,
                    marca: equipamento.marca.value,
                    administrador_id: user.admin.id,
                })
                .then(({ data }) => toast.success(data))
                .catch((error) => {
                    if (error.response.status === 400) {
                        toast.error(error.response.data.error);
                    } else {
                        toast.error("Erro ao tentar registrar o equipamento.");
                    }
                });
        }

        nome: equipamento.nome.value = "";
        ultimaManutencao: equipamento.ultimaManutencao.value = "";
        disponivel: equipamento.disponivel.value = "";
        fornecedor: equipamento.fornecedor.value = "";
        marca: equipamento.marca.value = "";
        administrador_id: user.admin.id = "";

        setOnEdit(null);
        getEquipamento();
    };

    return (
        <FormContainer ref={ref} onSubmit={handleSubmit}>
            <InputArea>
                <Label>Nome</Label>
                <Input name="nome" />
            </InputArea>
            <InputArea>
                <Label>Ultima Manutencao</Label>
                <Input name="ultimaManutencao" />
            </InputArea>
            <InputArea>
                <Label>Disponivel</Label>
                <Input name="disponivel" />
            </InputArea>
            <InputArea>
                <Label>Fornecedor</Label>
                <Input name="fornecedor" />
            </InputArea>
            <InputArea>
                <Label>Marca</Label>
                <Input name="marca" />
            </InputArea>
            <InputArea>
                <Label>Administrador</Label>
                <Input name="administrador_id" />
            </InputArea>

            <Button type="submit">SALVAR</Button>
        </FormContainer>
    );
};

export default Form;
