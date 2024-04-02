import { db } from "../db.js";

export const getExercicio = (req, res) => {
    const q = 
        "SELECT e.* FROM exercicio e JOIN rotina_de_exercicios rde ON e.rotina_de_exercicios_id=rde.id";

    db.query(q, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data);
    });
};

export const addExercicio = (req, res) => {
    const q_rotina_de_exercicios =
        "INSERT INTO rotina_de_exercicios(`descricao`, `data`, `ativo`) VALUES(?)";

    const values_rotina_de_exercicios = [
        req.body.descricao,
        req.body.data,
        req.body.ativo,
    ]

    db.query(q_rotina_de_exercicios, [values_rotina_de_exercicios], (err, results) => {
        if (err) return res.json(err);

        const rotina_de_exercicios_id = results.insertId;

        const q_exercicio = 
            "INSERT INTO exercicio(`nome`, `series`, `repeticoes`, `intervaloSeries`) VALUES(?)";
    
        const values_exercicio = [
            req.body.nome,
            req.body.series,
            req.body.repeticoes,
            req.body.intervaloSeries,
            rotina_de_exercicios_id,
            1,
        ];

        db.query(q_exercicio, [values_exercicio], (err) => {
            if (err) return res.json(err);

            return res.status(200).json("Exercício criado com sucesso!");
        });
    });
};

export const updateExercicio = (req, res) => {
    const q_exercicio = 
        "UPDATE exercicio SET `nome` = ?, `series` = ?, `repeticoes` = ?, `intervaloSeries` = ? WHERE `id` = ?";

    const values_exercicio = [
        req.body.nome,
        req.body.series,
        req.body.repeticoes,
        req.body.intervaloSeries
    ];
  
    db.query(q_exercicio, [...values_exercicio, req.params.id], (err) => {
        if (err) return res.json(err);

        const q_rotina_de_exerciciosID = 
            "SELECT rotina_de_exercicios_id FROM exercicio WHERE `id` = ?";

        db.query(q_rotina_de_exerciciosID, [req.params.id], (err, results) => {
            if (err) return res.json(err);
            
            const rotina_de_exercicios_id = results[0].rotina_de_exercicios_id;

            const q_rotina_de_exercicios =
                "UPDATE rotina_de_exercicios SET `descricao` = ?, `data` = ?, `ativo`= ? WHERE `id` = ?";

            const values_rotina_de_exercicios = [
                req.body.descricao,
                req.body.data,
                req.body.ativo,
            ]

            db.query(q_rotina_de_exercicios, [...values_rotina_de_exercicios, rotina_de_exercicios_id], (err) => {
                if (err) return res.json(err);

                return res.status(200).json("Exercício atualizado com sucesso!");
            });
        });
    });
};

export const deleteExercicio = (req, res) => {

    const q_rotina_de_exerciciosID = 
        "SELECT rotina_de_exercicios_id FROM exercicio WHERE `id` = ?";

    db.query(q_rotina_de_exerciciosID, [req.params.id], (err, results) => {
        if (err) return res.json(err);
        
        const rotina_de_exercicios_id = results[0].rotina_de_exercicios_id;

        const q_exercicio = "DELETE FROM exercicio WHERE `id` = ?";

        db.query(q_exercicio, [req.params.id], (err) => {
            if(err) return res.json(err);

            const q_rotina_de_exercicios =
                "DELETE FROM rotina_de_exercicios WHERE `id` = ?";

            db.query(q_rotina_de_exercicios, [rotina_de_exercicios_id], (err) => {
                if (err) return res.json(err);

                return res.status(200).json("Exercício deletado com sucesso!");
            });
        });
    });
};