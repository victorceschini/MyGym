import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const URL = "http://localhost:8800/aluno";

const Table = styled.table`
  width: 150%;
  margin-top: 10px;
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
  text-align: center;
  border-bottom: inset;
  padding-bottom: 5px;
  padding-left: 5px;
  padding-right: 5px;

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

export const Td = styled.td`
  padding-top: 15px;
  text-align: center;
  padding-left: 5px;
  padding-right: 5px;
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

const Grid = ({ aluno, setAluno, setOnEdit }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDeleteClick = (id) => {
    setConfirmDelete(true);
    setDeleteId(id);
  };

  const handleDeleteConfirm = async () => {
    await axios
      .delete(URL + deleteId)
      .then(({ data }) => {
        const newArray = aluno.filter((aluno) => aluno.id !== deleteId);
        setAluno(newArray);
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
            <Th>Nome</Th>
            <Th>Email</Th>
            <Th onlyWeb>Telefone</Th>
            <Th>CPF</Th>
            <Th>Estado</Th>
            <Th>Cidade</Th>
            <Th>Frequencia</Th>
            <Th>Plano</Th>
            <Th></Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {aluno.map((item, i) => (
            <Tr key={i}>
              <Td>{item.id}</Td>
              <Td>{item.nome}</Td>
              <Td>{item.email}</Td>
              <Td>{item.telefone}</Td>
              <Td>{item.cpf}</Td>
              <Td>{item.estado}</Td>
              <Td>{item.cidade}</Td>
              <Td>{item.total_frequencias}</Td>
              <Td>{item.planoAssinaturaAtivo === 1 ? "SIM" : "NÃO"}</Td>
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
