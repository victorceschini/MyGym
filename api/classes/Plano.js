import { db } from "../db.js";

export class Plano {
    constructor(id, nome, valor, descricao) {
        this.id = id;
        this.nome = nome;
        this.valor = valor;
        this.descricao = descricao;
    }

    static async getObjectPlano(id) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM plano_de_assinatura WHERE id = ?";
            db.query(query, [id], (err, results) => {
                if (err) return reject(err);
                if (results.length === 0) return resolve(null);
                const planoData = results[0];
                resolve(new Plano(planoData.id, planoData.nome, planoData.valor, planoData.descricao));
            });
        });
    }

    static async getAllPlano() {
        return new Promise((resolve, reject) => {
            const q = 
            "SELECT aluno.nome AS nome_aluno, aluno.cpf, plano_de_assinatura.* FROM plano_de_assinatura INNER JOIN aluno ON aluno.plano_de_assinatura_id=plano_de_assinatura.id";

            db.query(q, (err, data) => {
                if (err) return reject(err);
                resolve(data);
            });
        });
    }

    async save() {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO plano_de_assinatura (`nome`, `valor`, `descricao`) VALUES (?, ?, ?)";
            const values = [this.nome, this.valor, this.descricao];
            db.query(query, values, (err, results) => {
                if (err) return reject(err);
                this.id = results.insertId;
                resolve();
            });
        });
    }

    async update(id) {
        return new Promise((resolve, reject) => {
            const query = "UPDATE plano_de_assinatura SET `nome` = ?, `valor` = ?, `descricao` = ? WHERE `id` = ?";
            const values = [this.nome, this.valor, this.descricao, id];
            db.query(query, values, (err, results) => {
                if (err) return reject(err);
                resolve();
            });
        });
    }

    async delete(id) {
        return new Promise((resolve, reject) => {
            const query = "DELETE FROM plano_de_assinatura WHERE `id` = ?";
            db.query(query, [id], (err, results) => {
                if (err) return reject(err);
                resolve();
            });
        });
    }
}