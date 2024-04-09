import React, { useState } from "react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const URL = "http://localhost:8800/rotina";

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

const Grid = ({ rotina, setRotina, setOnEdit, user, userType }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDeleteClick = (id) => {
    if (userType !== "admin") {
      return toast.error("Não tem permissão para excluir rotinas.");
    }

    setConfirmDelete(true);
    setDeleteId(id);
  };

  const handleDeleteConfirm = async () => {
    await axios
      .delete(URL + deleteId)
      .then(({ data }) => {
        const newArray = rotina.filter((rotina) => rotina.id !== deleteId);
        setrotina(newArray);
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
            <Th>Descrição</Th>
            <Th>Data</Th>
            <Th>Ativo</Th>
            <Th></Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {rotina.map((item, i) => (
            <Tr key={i}>
              <Td>{item.descricao}</Td>
              <Td>{item.data}</Td>
              <Td>{item.ativo ? "Sim" : "Não"}</Td>
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