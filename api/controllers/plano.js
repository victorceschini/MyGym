import { Plano } from "../classes/Plano.js";
import { Aluno } from "../classes/Aluno.js";

export const getPlano = async (_req, res) => {
    try {
        const planos = await Plano.getAllPlano();
        return res.status(200).json(planos);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export const addPlano = async (req, res) => {
    try {
        const { nome, valor, descricao, cpf } = req.body;

        // Verifica se o aluno com o CPF especificado existe
        const aluno = await Aluno.getObjectAluno(cpf, null);
        if (!aluno) {
            return res.status(404).json({ error: "Aluno não encontrado." });
        }

        const plano = new Plano(null, nome, valor, descricao);
        await plano.save();

        // Associa o plano ao aluno
        aluno.plano_de_assinatura_id = plano.id;
        await aluno.update(aluno.id);
        
        return res.status(200).json("Plano criado e associado ao aluno com sucesso!");
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export const updatePlano = async (req, res) => {
    try {
        const { nome, valor, descricao, cpf } = req.body;

        // Verifica se o aluno com o CPF especificado existe
        const aluno = await Aluno.getObjectAluno(cpf, null);
        if (!aluno) {
            return res.status(404).json({ error: "Aluno não encontrado." });
        }

        const plano = await Plano.getObjectPlano(aluno.plano_de_assinatura_id);

        if (!plano) {
            return res.status(404).json({ error: "Plano não encontrado." });
        }

        plano.nome = nome;
        plano.valor = valor;
        plano.descricao = descricao;

        await plano.update(plano.id);
        
        return res.status(200).json("Plano atualizado com sucesso!");
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export const deletePlano = async (req, res) => {
    try {
        const plano_id = req.params.id;

        const plano = await Plano.getObjectPlano(plano_id);
        if (!plano) {
            return res.status(404).json({ error: "Plano não encontrado." });
        }

        const aluno = await Aluno.getAlunoByPlano(plano_id);
        if (!aluno) {
            return res.status(404).json({ error: "Aluno não encontrado." });
        }

        aluno.plano_de_assinatura_id = null;
        aluno.update(aluno.id);

        await plano.delete(plano.id);
        
        return res.status(200).json("Plano deletado com sucesso!");
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
