import { db } from "../db.js";

export class Professor {
    constructor(id, nome, email, senha, telefone, cpf, formacao, endereco_id) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.telefone = telefone;
        this.cpf = cpf;
        this.formacao = formacao;
        this.endereco_id = endereco_id;
    }

    static async getObjectProfessor(cpf, id) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM professor WHERE cpf = ? OR id = ?";
            db.query(query, [cpf, id], (err, results) => {
                if (err) return reject(err);
                if (results.length === 0) return resolve(null);
                const professorData = results[0];
                resolve(new Professor(professorData.id, professorData.nome, professorData.email,
                                      professorData.senha, professorData.telefone, professorData.cpf, 
                                      professorData.formacao, professorData.endereco_id));
            });
        });
    }

    static async getAllProfessor() {
        return new Promise((resolve, reject) => {
            const q = 
                `SELECT professor.*, endereco.estado, endereco.cidade, endereco.cep, endereco.bairro, endereco.logradouro 
                FROM professor INNER JOIN endereco ON professor.endereco_id=endereco.id`;
    
            db.query(q, (err, data) => {
                if (err) return reject(err);
                resolve(data);
            });
        });
    }
    

    async save() {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO professor (`nome`, `email`, `senha`, `telefone`, `cpf`, `formacaoAcademica`, `endereco_id`) VALUES (?, ?, ?, ?, ?, ?, ?)";

            const values = [this.nome, this.email, this.senha, this.telefone, this.cpf, this.formacao, this.endereco_id];
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
                "UPDATE professor SET `nome` = ?, `email` = ?, `senha` = ?, `telefone` = ?, `cpf` = ?, `formacaoAcademica` = ?, `endereco_id` = ? WHERE `id` = ?";

            const values = [this.nome, this.email, this.senha, this.telefone, this.cpf, this.formacao, this.endereco_id, id];
            db.query(query, values, (err, results) => {
                if (err) return reject(err);
                resolve();
            });
        });
    }

    async delete(id) {
        return new Promise((resolve, reject) => {
            const query = "DELETE FROM professor WHERE `id` = ?";
            db.query(query, [id], (err, results) => {
                if (err) return reject(err);
                resolve();
            });
        });
    }
}
