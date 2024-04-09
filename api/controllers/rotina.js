import { Rotina } from "../classes/Rotina.js";
import { Aluno } from "../classes/Aluno.js";
import { Professor } from "../classes/Professor.js";

export const getRotina = async (_req, res) => {
    try {
        const rotinas = await rotina.getAllRotina();
        return res.status(200).json(rotinas);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export const getRotinas = async (req, res) => {
    try {
        const {cpf_aluno, cpf_professor} = req.body;
        const rotinas = await rotina.getRotinas(cpf_aluno, cpf_professor);
        return res.status(200).json(rotinas);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export const addRotina = async (req, res) => {
    try {
        const { descricao, data, ativo,  cpf_aluno,  cpf_professor } = req.body;

        const aluno = await Aluno.getObjectAluno(cpf_aluno, null);

        if (!aluno) {
            return res.status(404).json({ error: "Aluno não encontrado." });
        }


        const professor = await Professor.getObjectProfessor(cpf_professor, null);

        if (!professor) {
            return res.status(404).json({ error: "Professor não encontrado." });
        }

        const rotina = new Rotina(null, aluno.id, professor.id, descricao, data, ativo);
        await rotina.save();
        
        return res.status(200).json("Rotina criada com sucesso!");
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: "Rotina já cadastrada" });
        }
        return res.status(500).json({ error: err.message });
    }
};

export const updateRotina = async (req, res) => {
    try {
        const { descricao, data, ativo, cpf_aluno,  cpf_professor } = req.body;
        
        const rotina_id = req.params.id;

        const rotina = await Rotina.getObjectRotina(rotina_id);

        if (!rotina) {
            return res.status(404).json({ error: "Rotina não encontrada." });
        }

        rotina.descricao = descricao;
        rotina.data = data;
        rotina.ativo = ativo;
        
        const aluno = await Aluno.getObjectAluno(cpf_aluno, null);

        if (!aluno) {
            return res.status(404).json({ error: "Aluno não encontrado." });
        }


        const professor = await Professor.getObjectProfessor(cpf_professor, null);

        if (!professor) {
            return res.status(404).json({ error: "Professor não encontrado." });
        }

        rotina.aluno_id = aluno.id;
        rotina.professor_id = prodessor.id;
        
        await rotina.update(rotina_id);
        
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

        await rotina.delete(rotina_id);
        
        return res.status(200).json("Rotina deletada com sucesso!");
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
