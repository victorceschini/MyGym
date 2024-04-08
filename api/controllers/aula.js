import { Aula } from "../classes/Aula.js";
import { Professor } from "../classes/Professor.js";

export const getAula = async (_req, res) => {
    try {
        const aulas = await Aula.getAllAula();
        return res.status(200).json(aulas);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export const addAula = async (req, res) => {
    try {
        const { modalidade, dias, descricao, local, administrador_id, professor_id } = req.body;

        // Verifica se o professor com o id especificado existe
        const professor = await Professor.getObjectProfessor(professor_id);
        if (!professor) {
            return res.status(404).json({ error: "Professor não encontrado." });
        }
        
        const aula = new Aula(null, modalidade, dias, descricao, local, administrador_id, professor_id);
        await aula.save();

        return res.status(200).json("Aula criada com sucesso!");
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export const updateAula = async (req, res) => {
    try {
        const { modalidade, dias, descricao, local, professor_id } = req.body;

        const aula_id = req.params.id;

        // Verifica se o professor com o id especificado existe
        const professor = await Professor.getObjectProfessor(professor_id);
        if (!professor) {
            return res.status(404).json({ error: "Professor não encontrado." });
        }

        const aula = await Aula.getObjectAula(aula_id);

        if (!aula) {
            return res.status(404).json({ error: "Aula não encontrada." });
        }

        aula.modalidade = modalidade;
        aula.dias = dias;
        aula.descricao = descricao;
        aula.local = local;
        aula.professor_id = professor_id;

        await aula.update(aula_id);
        
        return res.status(200).json("Aula atualizada com sucesso!");
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export const deleteAula = async (req, res) => {
    try {
        const aula_id = req.params.id;

        const aula = await Aula.getObjectAula(aula_id);
        if (!aula) {
            return res.status(404).json({ error: "Aula não encontrada." });
        }

        await aula.delete(aula_id);
        
        return res.status(200).json("Aula deletada com sucesso!");
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
