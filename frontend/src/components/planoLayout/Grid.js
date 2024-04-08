import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const URL = "http://localhost:8800/plano";

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

const Grid = ({ plano, setPlano, setOnEdit, user, userType }) => {
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
        return toast.error("Não tem permissão para excluir um plano.");
      }
        
      setConfirmDelete(true);
      setDeleteId(id);
    };

    const handleDeleteConfirm = async () => {
        await axios
          .delete(URL + deleteId)
          .then(({ data }) => {
            const newArray = plano.filter((plano) => plano.id !== deleteId);
            setPlano(newArray);
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

    const filteredPlano = userType === "aluno" ? plano.filter((item) => item.cpf === user.aluno.cpf) : plano;

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
                    <Th>Nome Aluno</Th>
                    <Th>CPF</Th>
                    <Th>Plano</Th>
                    <Th>Valor</Th>
                    <Th>Descrição</Th>
                    <Th></Th>
                    <Th></Th>
                </Tr>
            </Thead>
            <Tbody>
                {filteredPlano.map((item, i) => (
                    <Tr key={i}>
                        <Td>{item.id}</Td>
                        <Td>{item.nome_aluno}</Td>
                        <Td>{item.cpf}</Td>
                        <Td>{item.nome}</Td>
                        <Td>{item.valor}</Td>
                        <Td>{item.descricao}</Td>
                        <Td alignCenter width="5%">
                            <FaEdit onClick={() => handleEdit(item)} />
                        </Td>
                        <Td alignCenter width="5%">
                            <FaTrash onClick={() => handleDeleteClick(item.id)} />
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
      </>
    );
};

export default Grid;