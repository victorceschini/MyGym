import { db } from "../db.js";

export class Rotina {
    constructor(id, aluno_id, professor_id, descricao, data, ativo) {
        this.id = id;
        this.aluno_id = aluno_id;
        this.professor_id = professor_id;
        this.descricao = descricao;
        this.data = data;
        this.ativo = ativo;
    }

    static async getObjectRotina(id) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM rotina_de_exercicios WHERE id = ?";
            db.query(query, [id], (err, results) => {
                if (err) return reject(err);
                if (results.length === 0) return resolve(null);
                const RotinaData = results[0];
                resolve(new Rotina(RotinaData.id, RotinaData.aluno_id, RotinaData.professor_id, RotinaData.descricao, RotinaData.data, 
                                      RotinaData.ativo));
            });
        });
    }

    static async getRotinas(cpf_aluno, cpf_professor) {
        return new Promise((resolve, reject) => {
            const q = 
                `SELECT rotina_de_exercicios.*, 
                aluno.nome, aluno.email, aluno.telefone, aluno.cpf,
                professor.nome, professor.email, professor.telefone, professor.cpf, professor.formacao
                    FROM rotina_de_exercicios 
                    INNER JOIN aluno ON rotina_de_exercicios.aluno_id=aluno.id 
                    INNER JOIN professor ON rotina_de_exercicios.professor_id=professor.id
                    WHERE aluno.cpf = ? OR professor.cpf = ?`;
    
            db.query(q,[cpf_aluno, cpf_professor], (err, data) => {
                if (err) return reject(err);
                resolve(data);
            });
        });
    }

    static async getAllRotina() {
        return new Promise((resolve, reject) => {
            const q = 
                `SELECT rotina_de_exercicios.*, 
                aluno.nome, aluno.email, aluno.telefone, aluno.cpf,
                professor.nome, professor.email, professor.telefone, professor.cpf, professor.formacao
                    FROM rotina_de_exercicios 
                    INNER JOIN aluno ON rotina_de_exercicios.aluno_id=aluno.id 
                    INNER JOIN professor ON rotina_de_exercicios.professor_id=professor.id`;
    
            db.query(q, (err, data) => {
                if (err) return reject(err);
                resolve(data);
            });
        });
    }
    

    async save() {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO rotina_de_exericios ( `aluno_id`, `professor_id`, `descricao`, `data`, `ativo`, `exercicio_id`) VALUES (?, ?, ?, ?, ?, ?)";

            const values = [ this.aluno_id, this.professor_id, this.descricao, this.data, this.ativo, this.exercicio_id];
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
                "UPDATE rotina_de_exercicios SET `aluno_id` = ?, `professor_id` = ?, `descricao` = ?, `data` = ?, `ativo` = ?, `exercicio_id` = ? WHERE `id` = ?";

            const values = [ this.aluno_id, this.professor_id, this.descricao, this.data, this.ativo, this.exercicio_id, id];
            db.query(query, values, (err, results) => {
                if (err) return reject(err);
                resolve();
            });
        });
    }

    async delete(id) {
        return new Promise((resolve, reject) => {
            const query = "DELETE FROM rotina_de_exercicios WHERE `id` = ?";
            db.query(query, [id], (err, results) => {
                if (err) return reject(err);
                resolve();
            });
        });
    }
}