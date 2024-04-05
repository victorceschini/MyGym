import { db } from "../db.js";

export class Endereco {
    constructor(id, estado, cidade, cep, bairro, logradouro) {
        this.id = id;
        this.estado = estado;
        this.cidade = cidade;
        this.cep = cep;
        this.bairro = bairro;
        this.logradouro = logradouro;
    }

    static async getObjectEndereco(id) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM endereco WHERE id = ?";
            db.query(query, [id], (err, results) => {
                if (err) return reject(err);
                if (results.length === 0) return resolve(null);
                const enderecoData = results[0];
                resolve(new Endereco(enderecoData.id, enderecoData.estado, enderecoData.cidade, enderecoData.cep, enderecoData.bairro, enderecoData.logradouro));
            });
        });
    }

    async save() {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO endereco (`estado`, `cidade`, `cep`, `bairro`, `logradouro`) VALUES (?, ?, ?, ?, ?)";
            const values = [this.estado, this.cidade, this.cep, this.bairro, this.logradouro];
            db.query(query, values, (err, results) => {
                if (err) return reject(err);
                this.id = results.insertId;
                resolve(this.id);
            });
        });
    }

    async update(id) {
        return new Promise((resolve, reject) => {
            const query = "UPDATE endereco SET `estado` = ?, `cidade` = ?, `cep` = ?, `bairro` = ?, `logradouro` = ? WHERE `id` = ?";
            const values = [this.estado, this.cidade, this.cep, this.bairro, this.logradouro, id];
            db.query(query, values, (err, results) => {
                if (err) return reject(err);
                resolve();
            });
        });
    }

    async delete(id) {
        return new Promise((resolve, reject) => {
            const query = "DELETE FROM endereco WHERE `id` = ?";
            db.query(query, [id], (err, results) => {
                if (err) return reject(err);
                resolve();
            });
        });
    }
}