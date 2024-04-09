import { db } from "../db.js";

export class RotinaTemExercicio {
    constructor(id_exercicios, id_rotina) {
        this.id_exercicios = id_exercicios;
        this.id_rotina = id_rotina;
    }

    static async getObjectRotinaTemExercicio(exercicio_id, rotina_id) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM rotina_tem_exercicio WHERE exercicio_id = ? OR rotina_de_exercicios_id = ?";
            db.query(query, [exercicio_id, rotina_id], (err, results) => {
                if (err) return reject(err);
                if (results.length === 0) return resolve(null);
                const rotinaTemExercicioData = results[0];
                resolve(new RotinaTemExercicio(rotinaTemExercicioData.exercicio_id, rotinaTemExercicioData.rotina_id));
            });
        });
    }

    static async getAllRotinaTemExercicio() {
        return new Promise((resolve, reject) => {
            const q = 
                `SELECT rotina_tem_exercicio.* FROM rotina_tem_exercicio`;

            db.query(q, (err, data) => {
                if (err) return reject(err);
                resolve(data);
            });
        });
    }
    

    async save() {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO rotina_tem_exercicio (`exercicio_id`, `rotina_de_exercicios_id`) VALUES (?, ?)";

            const values = [this.id_exercicios, this.id_rotina];
            db.query(query, values, (err, results) => {
                if (err) return reject(err);
                this.id = results.insertId;
                resolve();
            });
        });
    }

    async update(exercicio_id, rotina_id) {
        return new Promise((resolve, reject) => {
            const query = 
                "UPDATE rotina_tem_exercicio SET `exercicio_id` = ?, `rotina_de_exercicios_id` = ? WHERE `exercicio_id` = ? AND rotina_de_exercicios_id = ?";

            const values = [this.id_exercicios, this.id_rotina, exercicio_id, rotina_id];
            db.query(query, values, (err, results) => {
                if (err) return reject(err);
                resolve();
            });
        });
    }

    async delete(exercicio_id, rotina_id) {
        return new Promise((resolve, reject) => {
            const query = "DELETE FROM rotina_tem_exercicio WHERE `exercicio_id` = ? AND rotina_de_exercicios_id = ?";
            db.query(query, [exercicio_id, rotina_id], (err, results) => {
                if (err) return reject(err);
                resolve();
            });
        });
    }
}