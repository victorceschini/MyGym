import { db } from "../db.js";

export const getAluno = (req, res) => {
    const q = 
        "SELECT aluno.*, endereco.estado, endereco.cidade, endereco.cep, endereco.bairro, endereco.logradouro FROM aluno INNER JOIN endereco ON aluno.endereco_id=endereco.id";

    db.query(q, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data);
    });
};

export const addAluno = (req, res) => {
    const q_endereco =
        "INSERT INTO endereco(`estado`, `cidade`, `cep`, `bairro`, `logradouro`) VALUES(?)";

    const values_endereco = [
        req.body.estado,
        req.body.cidade,
        req.body.cep,
        req.body.bairro,
        req.body.logradouro,
    ]

    db.query(q_endereco, [values_endereco], (err, results) => {
        if (err) return res.json(err);

        const endereco_id = results.insertId;

        const q_aluno = 
            "INSERT INTO aluno(`nome`, `email`, `telefone`, `cpf`, `administrador_id`, `endereco_id`, `plano_de_assinatura_id`) VALUES(?)";
    
        const values_aluno = [
            req.body.nome,
            req.body.email,
            req.body.telefone,
            req.body.cpf,
            req.body.administrador_id,
            endereco_id,
            1,
        ];

        db.query(q_aluno, [values_aluno], (err) => {
            if (err) return res.json(err);

            return res.status(200).json("Aluno criado com sucesso!");
        });
    });
};

export const updateAluno = (req, res) => {
    const q_aluno = 
        "UPDATE aluno SET `nome` = ?, `email` = ?, `telefone` = ?, `cpf` = ? WHERE `id` = ?";

    const values_aluno = [
        req.body.nome,
        req.body.email,
        req.body.telefone,
        req.body.cpf,
    ];
  
    db.query(q_aluno, [...values_aluno, req.params.id], (err) => {
        if (err) return res.json(err);

        const q_enderecoID = 
            "SELECT endereco_id FROM aluno WHERE `id` = ?";

        db.query(q_enderecoID, [req.params.id], (err, results) => {
            if (err) return res.json(err);
            
            const endereco_id = results[0].endereco_id;

            const q_endereco =
                "UPDATE endereco SET `estado` = ?, `cidade` = ?, `cep`= ?, `bairro` = ?, `logradouro` = ? WHERE `id` = ?";

            const values_endereco = [
                req.body.estado,
                req.body.cidade,
                req.body.cep,
                req.body.bairro,
                req.body.logradouro,
            ]

            db.query(q_endereco, [...values_endereco, endereco_id], (err) => {
                if (err) return res.json(err);

                return res.status(200).json("Aluno atualizado com sucesso!");
            });
        });
    });
};

export const deleteAluno = (req, res) => {

    const q_enderecoID = 
        "SELECT endereco_id FROM aluno WHERE `id` = ?";

    db.query(q_enderecoID, [req.params.id], (err, results) => {
        if (err) return res.json(err);
        
        const endereco_id = results[0].endereco_id;

        const q_aluno = "DELETE FROM aluno WHERE `id` = ?";

        db.query(q_aluno, [req.params.id], (err) => {
            if(err) return res.json(err);

            const q_endereco =
                "DELETE FROM endereco WHERE `id` = ?";

            db.query(q_endereco, [endereco_id], (err) => {
                if (err) return res.json(err);

                return res.status(200).json("Aluno deletado com sucesso!");
            });
        });
    });
};