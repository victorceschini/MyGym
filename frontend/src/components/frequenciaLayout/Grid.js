import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";

const URL = "http://localhost:8800/frequencia";

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

const Grid = ({ frequencia, setFrequencia, setOnEdit }) => {
    const handleCheckOut = async (id) => {
        await axios
          .put(URL + id, {
            id: id,
          })
          .then(({ data }) => toast.success(data))
          .catch((error) => {
            if (error.response.status === 400) {
                toast.error(error.response.data.error);
            } else {
                toast.error("Erro ao tentar realizar o Check-Out!");
            }
        });
    };

    const handleDelete = async (id) => {
        await axios
            .delete(URL + id)
            .then(({ data }) => {
                const newArray = frequencia.filter((frequencia) => frequencia.id !== id);

                setFrequencia(newArray);
                toast.success(data);
            })
            .catch(({ data }) => toast.error(data));

        setOnEdit(null);
    };

    const formatarData = (data) => {
        const dataObj = new Date(data).toLocaleString('pt-Br');
        return dataObj;
    }

    return (
        <Table>
            <Thead>
                <Tr>
                    <Th>Id</Th>
                    <Th>Nome</Th>
                    <Th>CPF</Th>
                    <Th>Data Check-In</Th>
                    <Th>Data Check-Out</Th>
                    <Th></Th>
                    <Th></Th>
                </Tr>
            </Thead>
            <Tbody>
                {frequencia.map((item, i) => (
                    <Tr key={i}>
                        <Td>{item.id}</Td>
                        <Td>{item.nome_aluno}</Td>
                        <Td>{item.cpf}</Td>
                        <Td>{formatarData(item.dataInicio)}</Td>
                        <Td>
                            {item.dataFim === null ? "Pendente" : formatarData(item.dataFim)}
                        </Td>
                        <Td alignCenter width="5%">
                            <FaCheckCircle onClick={() => handleCheckOut(item.id)} />
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