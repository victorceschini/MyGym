import { db } from "../db.js";

export const getProfessor = (req, res) => {
    const q = 
        "SELECT p.*, e.* FROM professor p JOIN endereco e ON p.endereco_id=e.id";

    db.query(q, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data);
    });
};

export const addProfessor = (req, res) => {
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

        const q_professor = 
            "INSERT INTO professor(`nome`, `cpf`, `telefone`, `email`, `formacaoAcademica`) VALUES(?)";
    
        const values_professor = [
            req.body.nome,
            req.body.cpf,
            req.body.telefone,
            req.body.email,
            req.body.formacaoAcademica,
            endereco_id,
            1,
        ];

        db.query(q_professor, [values_professor], (err) => {
            if (err) return res.json(err);

            return res.status(200).json("Professor criado com sucesso!");
        });
    });
};

export const updateProfessor = (req, res) => {
    const q_professor = 
        "UPDATE professor SET `nome` = ?, `cpf` = ?, `telefone` = ?, `email` = ? WHERE `id` = ?";

    const values_professor = [
        req.body.nome,
        req.body.cpf,
        req.body.telefone,
        req.body.email
    ];
  
    db.query(q_professor, [...values_professor, req.params.id], (err) => {
        if (err) return res.json(err);

        const q_enderecoID = 
            "SELECT endereco_id FROM professor WHERE `id` = ?";

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

                return res.status(200).json("Professor atualizado com sucesso!");
            });
        });
    });
};

export const deleteProfessor = (req, res) => {

    const q_enderecoID = 
        "SELECT endereco_id FROM professor WHERE `id` = ?";

    db.query(q_enderecoID, [req.params.id], (err, results) => {
        if (err) return res.json(err);
        
        const endereco_id = results[0].endereco_id;

        const q_professor = "DELETE FROM professor WHERE `id` = ?";

        db.query(q_professor, [req.params.id], (err) => {
            if(err) return res.json(err);

            const q_endereco =
                "DELETE FROM endereco WHERE `id` = ?";

            db.query(q_endereco, [endereco_id], (err) => {
                if (err) return res.json(err);

                return res.status(200).json("Professor deletado com sucesso!");
            });
        });
    });
};