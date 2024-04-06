import { Avaliacao } from "../classes/Avaliacao.js";

export const getAvaliacao = async (req, res) => {
    try {
        const avaliacao_id = req.params.id;

        const avaliacao = await Avaliacao.getObjectAvaliacao(avaliacao_id);

        if (!avaliacao) {
            return res.status(404).json({ error: "Avaliação não encontrada." });
        }

        return res.status(200).json(avaliacao);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export const getAvaliacaoByAluno = async (req, res) => {
    try {
        const aluno_id = req.params.id;

        const avaliacoes = await Avaliacao.getAvaliacaoByAluno(aluno_id);

        if (!avaliacoes || avaliacoes.length === 0) {
            return res
                .status(404)
                .json({ error: "Nenhuma avaliação encontrada" });
        }

        return res.status(200).json(avaliacoes);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export const getAvaliacaoByProfessor = async (req, res) => {
    try {
        const professor_id = req.params.id;

        const avaliacoes = await Avaliacao.getAvaliacaoByProfessor(
            professor_id
        );

        if (!avaliacoes || avaliacoes.length === 0) {
            return res
                .status(404)
                .json({ error: "Nenhuma avaliação encontrada" });
        }

        return res.status(200).json(avaliacoes);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export const addAvaliacao = async (req, res) => {
    try {
        const {
            aluno_id,
            quadril,
            abdomen,
            coxa,
            panturilha,
            biceps,
            antebraco,
            altura,
            massa,
            data,
            professor_id,
        } = req.body;

        const avaliacao = new Avaliacao(
            null,
            aluno_id,
            quadril,
            abdomen,
            coxa,
            panturilha,
            biceps,
            antebraco,
            altura,
            massa,
            data,
            professor_id
        );
        await avaliacao.save();

        return res.status(200).json("Avaliação criada com sucesso!");
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export const updateAvaliacao = async (req, res) => {
    try {
        const {
            aluno_id,
            quadril,
            abdomen,
            coxa,
            panturilha,
            biceps,
            antebraco,
            altura,
            massa,
            data,
            professor_id,
        } = req.body;

        const avaliacao_id = req.params.id;

        const avaliacao = await Avaliacao.getObjectAvaliacao(avalicao_id);

        if (!avaliacao) {
            return res.status(404).json({ error: "Avaliação não encontrada." });
        }

        avaliacao.aluno_id = aluno_id;
        avaliacao.quadril = quadril;
        avaliacao.abdomen = abdomen;
        avaliacao.coxa = coxa;
        avaliacao.panturilha = panturilha;
        avaliacao.biceps = biceps;
        avaliacao.antebraco = antebraco;
        avaliacao.altura = altura;
        avaliacao.massa = massa;
        avaliacao.data = data;
        avaliacao.professor_id = professor_id;

        await avaliacao.update(avalicao_id);

        return res.status(200).json("Avaliação atualizada com sucesso!");
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export const deleteAvaliacao = async (req, res) => {
    try {
        const avaliacao_id = req.params.id;

        const avaliacao = await Avaliacao.getObjectAvaliacao(avaliacao_id);

        if (!avaliacao) {
            return res.status(404).json({ error: "Avaliação não encontrada." });
        }

        await avaliacao.delete(avaliacao_id);

        return res.status(200).json("Avaliação deletada com sucesso!");
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
