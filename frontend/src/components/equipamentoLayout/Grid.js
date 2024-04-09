import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import Equipamento from "../Equipamento";

const URL = "http://localhost:8800/equipamento";

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

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
    text-align: start;
    border-bottom: inset;
    padding-bottom: 5px;

    @media (max-width: 500px) {
        ${(props) => props.onlyWeb && "display: none"}
    }
`;

export const Td = styled.td`
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

const Grid = ({ equipamento, setEquipamento, setOnEdit, user, userType }) => {
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const handleEdit = (item) => {
        if (userType !== "admin") {
            return toast.error("Não tem permissão para editar um equipamento.");
        }
        setOnEdit(item);
    };

    const handleDeleteClick = (id) => {
        if (userType !== "admin") {
            return toast.error(
                "Não tem permissão para excluir um equipamento."
            );
        }
        setConfirmDelete(true);
        setDeleteId(id);
    };

    const handleDeleteConfirm = async () => {
        await axios
            .delete(URL + deleteId)
            .then(({ data }) => {
                const newArray = aula.filter(
                    (equipamento) => Equipamento.id !== deleteId
                );
                setEquipamento(newArray);
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
                        <Th>Id</Th>
                        <Th>Modalidade</Th>
                        <Th>Dias</Th>
                        <Th>Descrição</Th>
                        <Th>Local</Th>
                        <Th>Professor</Th>
                        <Th></Th>
                        <Th></Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {aula.map((item, i) => (
                        <Tr key={i}>
                            <Td>{item.id}</Td>
                            <Td>{item.modalidade}</Td>
                            <Td>{item.dias}</Td>
                            <Td>{item.descricao}</Td>
                            <Td>{item.local}</Td>
                            <Td>{item.professor_nome}</Td>
                            <Td alignCenter width="5%">
                                <FaEdit onClick={() => handleEdit(item)} />
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
