import { db } from "../db.js";

export class Aula {
    constructor(id, modalidade, dias, descricao, local, administrador_id, professor_id) {
        this.id = id;
        this.modalidade = modalidade;
        this.dias = dias;
        this.descricao = descricao;
        this.local = local;
        this.administrador_id = administrador_id;
        this.professor_id = professor_id;
    }

    static async getObjectAula(id) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM aula WHERE id = ?";
            db.query(query, [id], (err, results) => {
                if (err) return reject(err);
                if (results.length === 0) return resolve(null);
                const aulaData = results[0];
                resolve(new Aula(aulaData.id, aulaData.modalidade, aulaData.dias, aulaData.descricao, 
                                 aulaData.local, aulaData.administrador_id, aulaData.professor_id));
            });
        });
    }

    static async getAllAula() {
        return new Promise((resolve, reject) => {
            const q = `SELECT aula.*, professor.nome AS professor_nome 
                       FROM aula
                       INNER JOIN professor ON aula.professor_id=professor.id`;

            db.query(q, (err, data) => {
                if (err) return reject(err);
                resolve(data);
            });
        });
    }

    async save() {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO aula (`modalidade`, `dias`, `descricao`, `local`, `administrador_id`, `professor_id`) VALUES (?, ?, ?, ?, ?, ?)";
            const values = [this.modalidade, this.dias, this.descricao, this.local, this.administrador_id, this.professor_id];
            db.query(query, values, (err, results) => {
                if (err) return reject(err);
                this.id = results.insertId;
                resolve();
            });
        });
    }

    async update(id) {
        return new Promise((resolve, reject) => {
            const query = "UPDATE aula SET `modalidade` = ?, `dias` = ?, `descricao` = ?, `local` = ?, `administrador_id` = ?, `professor_id` = ? WHERE `id` = ?";
            const values = [this.modalidade, this.dias, this.descricao, this.local, this.administrador_id, this.professor_id, id];
            db.query(query, values, (err, results) => {
                if (err) return reject(err);
                resolve();
            });
        });
    }

    async delete(id) {
        return new Promise((resolve, reject) => {
            const query = "DELETE FROM aula WHERE `id` = ?";
            db.query(query, [id], (err, results) => {
                if (err) return reject(err);
                resolve();
            });
        });
    }
}