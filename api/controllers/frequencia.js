import { Frequencia } from "../classes/Frequencia.js";
import { Aluno } from "../classes/Aluno.js";

export const getFrequencia = async (_req, res) => {
    try {
        const frequencias = await Frequencia.getAllFrequencia();
        return res.status(200).json(frequencias);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export const addFrequencia = async (req, res) => {
    try {
        const { cpf } = req.body;

        // Verifica se o aluno com o CPF especificado existe
        const aluno = await Aluno.getObjectAluno(cpf, null);
        if (!aluno) {
            return res.status(404).json({ error: "Aluno não encontrado." });
        }

        // Verifica se já existe uma frequência pendente para o aluno
        const frequenciaPendente = await Frequencia.getFrequenciaPendente(aluno.id);
        if (frequenciaPendente) {
            return res.status(400).json({ error: "Já existe uma frequência pendente para este aluno." });
        }

        const dataInicio = new Date();
        const frequencia = new Frequencia(null, aluno.id, dataInicio, null, 1, 0);
        await frequencia.save();
        
        return res.status(200).json("Check-in registrado com sucesso!");
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export const updateFrequencia = async (req, res) => {
    try {
        const freq_id = req.params.id;
        
        const frequencia = await Frequencia.getObjectFrequencia(freq_id);

        if (!frequencia) {
            return res.status(404).json({ error: "Frequencia não encontrada." });
        }

        // Verifica se o aluno com o ID especificado existe
        const aluno = await Aluno.getObjectAluno(null, frequencia.aluno_id);
        if (!aluno) {
            return res.status(404).json({ error: "Aluno não encontrado." });
        }

        const dataFim = new Date();
        frequencia.dataFim = dataFim;
        frequencia.checkOut = 1;

        await frequencia.update(freq_id);
        
        return res.status(200).json("Check-out registrado com sucesso!");
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export const deleteFrequencia = async (req, res) => {
    try {
        const freq_id = req.params.id;

        const frequencia = await Frequencia.getObjectFrequencia(freq_id);
        if (!frequencia) {
            return res.status(404).json({ error: "Frequencia não encontrada." });
        }

        await frequencia.delete(freq_id);
        
        return res.status(200).json("Frequencia deletada com sucesso!");
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
