import { Rotina } from "../classes/Rotina.js";
import { Exercicio } from "../classes/Exercicio.js";

export const getRotina = async (_req, res) => {
    try {
        const rotinas = await rotina.getAllRotina();
        return res.status(200).json(rotinas);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export const addRotina = async (req, res) => {
    try {
        const { descricao, data, ativo,nome, series, repeticoes, intervalo } = req.body;

        const exercicio = new Exercicio(null, nome, series, repeticoes, intervalo);
        const exercicio_id = await exercicio.save();

        const rotina = new Rotina(null, descricao, data, ativo, exercicio_id);
        await rotina.save();
        
        return res.status(200).json("Rotina criada com sucesso!");
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: "CPF já registrado para outro rotina." });
        }
        return res.status(500).json({ error: err.message });
    }
};

export const updateRotina = async (req, res) => {
    try {
        const { descricao, data, ativo,nome, series, repeticoes, intervalo } = req.body;
        
        const rotina_id = req.params.id;

        const rotina = await Rotina.getObjectRotina(rotina_id);

        if (!rotina) {
            return res.status(404).json({ error: "Rotina não encontrada." });
        }

        rotina.descricao = descricao;
        rotina.data = data;
        rotina.ativo = ativo;
        
        const exercicio = await Exercicio.getObjectExercicio(rotina.exercicio_id)

        if (!exercicio) {
            return res.status(404).json({ error: "Exercício não encontrado." });
        }

        exercicio.nome = nome;
        exercicio.series = series;
        exercicio.repeticoes = repeticoes;
        exercicio.intervalo = intervalo;
        
        await rotina.update(rotina_id);
        await exercicio.update(exercicio.id);
        
        return res.status(200).json("Rotina atualizada com sucesso!");
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export const deleteRotina = async (req, res) => {
    try {
        const rotina_id = req.params.id;
        
        const rotina = await Rotina.getObjectRotina(rotina_id);

        if (!rotina) {
            return res.status(404).json({ error: "Rotina não encontrada." });
        }
        
        const exercicio = await Exercicio.getObjectExercicio(rotina.exercicio_id);
        if (!exercicio) {
            return res.status(404).json({ error: "Endereço não encontrado." });
        }

        await rotina.delete(rotina_id);
        await exercicio.delete(exercicio.id);
        
        return res.status(200).json("Rotina deletada com sucesso!");
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
