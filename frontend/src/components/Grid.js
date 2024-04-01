import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const URL = "http://localhost:8800/aluno";

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

const Grid = ({ aluno, setAluno, setOnEdit }) => {
    console.log(aluno);

    const handleEdit = (item) => {
        setOnEdit(item);
    };

    const handleDelete = async (id) => {
        await axios
            .delete(URL + id)
            .then(({ data }) => {
                const newArray = aluno.filter((aluno) => aluno.id !== id);

                setAluno(newArray);
                toast.success(data);
            })
            .catch(({ data }) => toast.error(data));

        setOnEdit(null);
    };

    return (
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
                        <Td>
                            {item.planoAssinaturaAtivo === 1 ? "SIM" : "NÃO"}
                        </Td>
                        <Td alignCenter width="5%">
                            <FaEdit onClick={() => handleEdit(item)} />
                        </Td>
                        <Td alignCenter width="5%">
                            <FaTrash onClick={() => handleDelete(item.id)} />
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};

export default Grid;