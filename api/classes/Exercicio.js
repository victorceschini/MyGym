import { db } from "../db.js";

export class Exercicio {
    constructor(id, nome, series, repeticoes, intervalo) {
        this.id = id;
        this.nome = nome;
        this.series = series;
        this.repeticoes = repeticoes;
        this.intervalo = intervalo;
    }

    static async getObjectExercicio(id) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM exercicio WHERE id = ?";
            db.query(query, [id], (err, results) => {
                if (err) return reject(err);
                if (results.length === 0) return resolve(null);
                const exercicioData = results[0];
                resolve(new Exercicio(exercicioData.id, exercicioData.nome, exercicioData.series,
                                      exercicioData.repeticoes, exercicioData.intervalo));
            });
        });
    }

    static async getAllExercicio() {
        return new Promise((resolve, reject) => {
            const q = 
                `SELECT exercicio.* FROM exercicio`;

            db.query(q, (err, data) => {
                if (err) return reject(err);
                resolve(data);
            });
        });
    }
    

    async save() {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO exercicio (`nome`, `series`, `repeticoes`, `intervalo_series`) VALUES (?, ?, ?, ?)";

            const values = [this.nome, this.series, this.repeticoes, this.intervalo];
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
                "UPDATE exercicio SET `nome` = ?, `series` = ?, `repeticoes` = ?, `intervalo_series` = ? WHERE `id` = ?";

            const values = [this.nome, this.series, this.repeticoes, this.intervalo, id];
            db.query(query, values, (err, results) => {
                if (err) return reject(err);
                resolve();
            });
        });
    }

    async delete(id) {
        return new Promise((resolve, reject) => {
            const query = "DELETE FROM exercicio WHERE `id` = ?";
            db.query(query, [id], (err, results) => {
                if (err) return reject(err);
                resolve();
            });
        });
    }
}