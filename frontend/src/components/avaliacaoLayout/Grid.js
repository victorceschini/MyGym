import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";

const URL = "http://localhost:8800/avaliacao";

const Table = styled.table`
    width: 100%;
    margin: 20px auto;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
    word-break: break-all;
    table-layout: fixed;
    overflow-x: auto;
`;

const Thead = styled.thead``;

const Tbody = styled.tbody``;

const Tr = styled.tr``;

const Th = styled.th`
    text-align: start;
    border-bottom: inset;
    padding-bottom: 5px;

    @media (max-width: 500px) {
        ${(props) => props.onlyWeb && "display: none"}
    }
`;

const Td = styled.td`
    padding-top: 15px;
    text-align: ${(props) => (props.alignCenter ? "center" : "start")};
    width: ${(props) => (props.width ? props.width : "auto")};
    min-width: 100px;

    @media (max-width: 500px) {
        ${(props) => props.onlyWeb && "display: none"}
    }
`;

const Button = styled.button`
    padding: 10px;
    margin: auto;
    margin-top: 10px;
    margin-left: 55px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    background-color: #e8491d;
    color: white;
    height: 42px;
`;

const ConfirmationModal = ({ isOpen, onCancel, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div>
            <div>Tem certeza que deseja excluir?</div>
            <Button onClick={onConfirm}>Sim</Button>
            <Button onClick={onCancel}>Não</Button>
        </div>
    );
};

const Grid = ({ avaliacao, setAvaliacao, setOnEdit, user, userType }) => {
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const handleEdit = (item) => {
        if (userType !== "admin") {
            return toast.error("Não tem permissão para editar um plano.");
        }
        setOnEdit(item);
    };

    const handleDeleteClick = (id) => {
        if (userType !== "admin") {
            return toast.error("Não tem permissão para excluir uma avaliação.");
        }

        setConfirmDelete(true);
        setDeleteId(id);
    };

    const handleDeleteConfirm = async () => {
        await axios
            .delete(`${URL}/${deleteId}`)
            .then(({ data }) => {
                const newArray = avaliacao.filter(
                    (item) => item.id !== deleteId
                );
                setAvaliacao(newArray);
                toast.success(data);
            })
            .catch(({ data }) => toast.error(data));

        setOnEdit(null);
        setConfirmDelete(false);
        setDeleteId(null);
    };

    const handleDeleteCancel = () => {
        setConfirmDelete(false);
        setDeleteId(null);
    };

    const formatarData = (data) => {
        const dataObj = new Date(data).toLocaleString("pt-Br");
        return dataObj;
    };

    const filteredAvaliacao =
        userType === "aluno"
            ? avaliacao.filter((item) => item.cpf === user.aluno.cpf)
            : avaliacao;

    return (
        <>
            <ConfirmationModal
                isOpen={confirmDelete}
                onCancel={handleDeleteCancel}
                onConfirm={handleDeleteConfirm}
            />
            <Table>
                <Thead>
                    <Tr>
                        <Th>Nome</Th>
                        <Th>Quadril</Th>
                        <Th>Abdomen</Th>
                        <Th>Coxa</Th>
                        <Th>Panturilha</Th>
                        <Th>Biceps</Th>
                        <Th>Antebraco</Th>
                        <Th>Altura</Th>
                        <Th>Massa</Th>
                        <Th>Data</Th>
                        <Th></Th>
                        <Th></Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {filteredAvaliacao.map((item, i) => (
                        <Tr key={i}>
                            <Td>{item.id}</Td>
                            <Td>{item.nome_aluno}</Td>
                            <Td>{item.cpf}</Td>
                            <Td>{formatarData(item.dataInicio)}</Td>
                            <Td>
                                {item.dataFim === null
                                    ? "Pendente"
                                    : formatarData(item.dataFim)}
                            </Td>
                            <Td alignCenter width="5%">
                                <FaCheckCircle
                                    onClick={() => handleEdit(item.id)}
                                />
                            </Td>
                            <Td alignCenter width="5%">
                                <FaTrash
                                    onClick={() => handleDeleteClick(item.id)}
                                />
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </>
    );
};

export default Grid;
