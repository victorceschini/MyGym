import { Equipamento } from "../classes/Equipamento.js";

export const getEquipamento = async (req, res) => {
    try {
        const equipamento_id = req.params.id;

        const equipamento = await Equipamento.getObjectEquipamento(
            equipamento_id
        );

        if (!equipamento) {
            return res
                .status(404)
                .json({ error: "Equipamento não encontrado." });
        }

        return res.status(200).json(equipamento);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export const addEquipamento = async (req, res) => {
    try {
        const {
            nome,
            ultimaManutencao,
            disponivel,
            fornecedor,
            marca,
            administrador_id,
        } = req.body;

        const equipamento = new Equipamento(
            null,
            nome,
            ultimaManutencao,
            disponivel,
            fornecedor,
            marca,
            administrador_id
        );
        await equipamento.save();

        return res.status(200).json("Equipamento adicionado com sucesso!");
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export const updateEquipamento = async (req, res) => {
    try {
        const {
            nome,
            ultimaManutencao,
            disponivel,
            fornecedor,
            marca,
            administrador_id,
        } = req.body;

        const equipamento_id = req.params.id;

        const equipamento = await Equipamento.getObjectAvaliacao(
            equipamento_id
        );

        if (!equipamento) {
            return res
                .status(404)
                .json({ error: "Equipamento não encontrado." });
        }

        equipamento.nome = nome;
        equipamento.ultimaManutencao = ultimaManutencao;
        equipamento.disponivel = disponivel;
        equipamento.fornecedor = fornecedor;
        equipamento.marca = marca;
        equipamento.administrador_id = administrador_id;

        await equipamento.update(equipamento_id);

        return res.status(200).json("Equipamento atualizado com sucesso!");
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export const deleteEquipamento = async (req, res) => {
    try {
        const equipamento_id = req.params.id;

        const equipamento = await Equipamento.getObjectAula(equipamento_id);
        if (!equipamento) {
            return res
                .status(404)
                .json({ error: "Equipamento não encontrado." });
        }

        await equipamento.delete(equipamento_id);

        return res.status(200).json("Equipamento deletado com sucesso!");
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
