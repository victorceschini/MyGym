import { db } from "../db.js";

export class Frequencia {
    constructor(id, aluno_id, dataInicio, dataFim, checkIn, checkOut) {
        this.id = id;
        this.aluno_id = aluno_id;
        this.dataInicio = dataInicio;
        this.dataFim = dataFim;
        this.checkIn = checkIn;
        this.checkOut = checkOut;
    }

    static async getObjectFrequencia(id) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM frequencia WHERE id = ?";
            db.query(query, [id], (err, results) => {
                if (err) return reject(err);
                if (results.length === 0) return resolve(null);
                const frequenciaData = results[0];
                resolve(new Frequencia(frequenciaData.id, frequenciaData.aluno_id, frequenciaData.dataInicio, frequenciaData.dataFim, frequenciaData.checkIn, frequenciaData.checkOut));
            });
        });
    }

    static async getAllFrequencia() {
        return new Promise((resolve, reject) => {
            const q = 
            "SELECT aluno.nome AS nome_aluno, aluno.cpf, frequencia.* FROM frequencia INNER JOIN aluno ON aluno.id=frequencia.aluno_id";

            db.query(q, (err, data) => {
                if (err) return reject(err);
                resolve(data);
            });
        });
    }

    static async getFrequenciaPendente(alunoId) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM frequencia WHERE aluno_id = ? AND checkOut = 0";
            db.query(query, [alunoId], (err, results) => {
                if (err) return reject(err);
                if (results.length === 0) return resolve(null);
                const frequenciaData = results[0];
                resolve(new Frequencia(frequenciaData.id, frequenciaData.aluno_id, frequenciaData.dataInicio, frequenciaData.dataFim, frequenciaData.checkIn, frequenciaData.checkOut));
            });
        });
    }
    

    async save() {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO frequencia (`aluno_id`, `dataInicio`, `dataFim`, `checkIn`, `checkOut`) VALUES (?, ?, ?, ?, ?)";

            const values = [this.aluno_id, this.dataInicio, this.dataFim, this.checkIn, this.checkOut];
            db.query(query, values, (err, results) => {
                if (err) return reject(err);
                this.id = results.insertId;
                resolve();
            });
        });
    }

    async update(id) {
        return new Promise((resolve, reject) => {
            const query = "UPDATE frequencia SET `aluno_id` = ?, `dataInicio` = ?, `dataFim` = ?, `checkIn` = ?, `checkOut` = ? WHERE `id` = ?";

            const values = [this.aluno_id, this.dataInicio, this.dataFim, this.checkIn, this.checkOut, id];
            db.query(query, values, (err, results) => {
                if (err) return reject(err);
                resolve();
            });
        });
    }

    async delete(id) {
        return new Promise((resolve, reject) => {
            const query = "DELETE FROM frequencia WHERE `id` = ?";
            db.query(query, [id], (err, results) => {
                if (err) return reject(err);
                resolve();
            });
        });
    }
}
