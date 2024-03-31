import { db } from "../db.js";

export const getAluno = (req, res) => {
    const q = "SELECT * FROM aluno";

    db.query(q, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data);
    });
};

export const addAluno = (req, res) => {
    console.log("Dados recebidos do frontend:", req.body);
    console.log("ID do administrador recebido no backend:", req.body.administrador_id);
    
    const q = 
        "INSERT INTO aluno(`nome`, `email`, `telefone`, `cpf`, `administrador_id`, `endereco_id`, `plano_de_assinatura_id`) VALUES(?)";
    
    const values = [
        req.body.nome,
        req.body.email,
        req.body.telefone,
        req.body.cpf,
        req.body.administrador_id,
        1,
        1,
    ];

    db.query(q, [values], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Aluno criado com sucesso!");
    });
};

export const updateAluno = (req, res) => {
    const q = 
        "UPDATE aluno SET `nome` = ?, `email` = ?, `telefone` = ?, `cpf` = ? WHERE `id` = ?";

    const values = [
        req.body.nome,
        req.body.email,
        req.body.telefone,
        req.body.cpf,
    ];
  
    db.query(q, [...values, req.params.id], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Aluno atualizado com sucesso!");
    });
};

export const deleteAluno = (req, res) => {
    const q = "DELETE FROM aluno WHERE `id` = ?";

    db.query(q, [req.params.id], (err) => {
        if(err) return res.json(err);

        return res.status(200).json("Aluno deletado com sucesso!");
    });
};