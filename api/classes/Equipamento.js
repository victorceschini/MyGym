import { db } from "../db.js";

export class Equipamento {
    constructor(
        id,
        nome,
        ultimaManutencao,
        disponivel,
        fornecedor,
        marca,
        administrador_id
    ) {
        this.id = id;
        this.nome = nome;
        this.ultimaManutencao = ultimaManutencao;
        this.disponivel = disponivel;
        this.fornecedor = fornecedor;
        this.marca = marca;
        this.administrador_id = administrador_id;
    }

    static async getObjectEquipamento(id) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM equipamento WHERE id = ?";
            db.query(query, [id], (err, results) => {
                if (err) return reject(err);
                if (results.length === 0) return resolve(null);
                const equipamentoData = results[0];
                resolve(
                    new Equipamento(
                        Equipamento.id,
                        Equipamento.nome,
                        Equipamento.ultimaManutencao,
                        Equipamento.disponivel,
                        Equipamento.fornecedor,
                        Equipamento.marca,
                        Equipamento.administrador_id
                    )
                );
            });
        });
    }

    static async getAllEquipamento() {
        return new Promise((resolve, reject) => {
            const q = `SELECT * FROM equipamento`;
            db.query(q, (err, data) => {
                if (err) return reject(err);
                resolve(data);
            });
        });
    }

    async save() {
        return new Promise((resolve, reject) => {
            const query =
                "INSERT INTO equipamento (`nome`, `ultimaManutencao`, `disponivel`, `fornecedor`, `marca`, `administrador_id`) VALUES (?, ?, ?, ?, ?, ?)";

            const values = [
                this.nome,
                this.ultimaManutencao,
                this.disponivel,
                this.fornecedor,
                this.marca,
                this.administrador_id,
            ];
            db.query(query, values, (err, results) => {
                if (err) return reject(err);
                this.id = results.insertId;
                resolve();
            });
        });
    }

    async update(id) {
        return new Promise((resolve, reject) => {
            const query =
                "UPDATE equipamento SET `nome` = ?, `ultimaManutencao` = ?, `disponivel`= ?, `fornecedor` = ?, `marca` = ?, `administrador_id` = ? WHERE `id` = ?";
            const values = [
                this.nome,
                this.ultimaManutencao,
                this.disponivel,
                this.fornecedor,
                this.marca,
                this.administrador_id,
                id,
            ];
            db.query(query, values, (err, results) => {
                if (err) return reject(err);
                resolve();
            });
        });
    }

    async delete(id) {
        return new Promise((resolve, reject) => {
            const query = "DELETE FROM equipamento WHERE `id` = ?";
            db.query(query, [id], (err, results) => {
                if (err) return reject(err);
                resolve();
            });
        });
    }
}
