import { Exercicio } from "../classes/Exercicio.js";

export const getExercicio = async (_req, res) => {
    try {
        const exercicios = await Exercicio.getAllExercicio();
        return res.status(200).json(exercicios);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export const addExercicio = async (req, res) => {
    try {
        const {nome, series, repeticoes, intervalo} = req.body;
        const exercicio = new Exercicio(null, nome, series, repeticoes, intervalo);
        await exercicio.save();
        
        return res.status(200).json("Exercicio criado com sucesso!");
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: "CPF já registrado para outro exercicio." });
        }
        return res.status(500).json({ error: err.message });
    }
};

export const updateExercicio = async (req, res) => {
    try {
        const { nome, series, repeticoes, intervalo } = req.body;
        
        const exercicio_id = req.params.id;

        const exercicio = await Exercicio.getObjectExercicio(exercicio_id);

        if (!exercicio) {
            return res.status(404).json({ error: "Exercicio não encontrado." });
        }

        exercicio.nome = nome;
        exercicio.series = series;
        exercicio.repeticoes = repeticoes;
        exercicio.intervalo = intervalo;

        await exercicio.update(Exercicio_id);
        
        return res.status(200).json("Exercicio atualizado com sucesso!");
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export const deleteExercicio = async (req, res) => {
    try {
        const exercicio_id = req.params.id;
        
        const exercicio = await Exercicio.getObjectExercicio(exercicio_id);

        if (!exercicio) {
            return res.status(404).json({ error: "Exercicio não encontrado." });
        }
        
        await exercicio.delete(exercicio_id);
        
        return res.status(200).json("Exercicio deletado com sucesso!");
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
