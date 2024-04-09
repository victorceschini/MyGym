import { db } from "../db.js";

export class Rotina {
    constructor(id, descricao, data, ativo, exercicio_id) {
        this.id = id;
        this.descricao = descricao;
        this.data = data;
        this.ativo = ativo;
        this.exercicio_id = exercicio_id;
    }

    static async getObjectRotina(id) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM rotina WHERE id = ?";
            db.query(query, [id], (err, results) => {
                if (err) return reject(err);
                if (results.length === 0) return resolve(null);
                const RotinaData = results[0];
                resolve(new Rotina(RotinaData.id, RotinaData.descricao, RotinaData.data,
                                      RotinaData.ativo, RotinaData.exercicio_id));
            });
        });
    }

    static async getAllRotina() {
        return new Promise((resolve, reject) => {
            const q = 
                `SELECT rotina.*, exercicio.nome, exercicio.series, exercicio.repeticoes, exercicio.intervalo 
                FROM rotina INNER JOIN exercicio ON rotina.exercicio_id=exercicio.id`;
    
            db.query(q, (err, data) => {
                if (err) return reject(err);
                resolve(data);
            });
        });
    }
    

    async save() {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO rotina ( `descricao`, `data`, `ativo`, `exercicio_id`) VALUES (?, ?, ?, ?)";

            const values = [ this.descricao, this.data, this.ativo, this.exercicio_id];
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
                "UPDATE rotina SET `descricao` = ?, `data` = ?, `ativo` = ?, `exercicio_id` = ? WHERE `id` = ?";

            const values = [ this.descricao, this.data, this.ativo, this.exercicio_id, id];
            db.query(query, values, (err, results) => {
                if (err) return reject(err);
                resolve();
            });
        });
    }

    async delete(id) {
        return new Promise((resolve, reject) => {
            const query = "DELETE FROM rotina WHERE `id` = ?";
            db.query(query, [id], (err, results) => {
                if (err) return reject(err);
                resolve();
            });
        });
    }
}