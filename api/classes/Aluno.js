import { db } from "../db.js";

export class Aluno {
    constructor(id, nome, email, senha, telefone, cpf, administrador_id, endereco_id, plano_de_assinatura_id) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.telefone = telefone;
        this.cpf = cpf;
        this.administrador_id = administrador_id;
        this.endereco_id = endereco_id;
        this.plano_de_assinatura_id = plano_de_assinatura_id;
    }

    static async getObjectAluno(cpf, id) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM aluno WHERE cpf = ? OR id = ?";
            db.query(query, [cpf, id], (err, results) => {
                if (err) return reject(err);
                if (results.length === 0) return resolve(null);
                const alunoData = results[0];
                resolve(new Aluno(alunoData.id, alunoData.nome, alunoData.email, alunoData.senha, alunoData.telefone, alunoData.cpf, alunoData.administrador_id, alunoData.endereco_id, alunoData.plano_de_assinatura_id));
            });
        });
    }

    static async getAlunoByPlano(plano_id) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM aluno WHERE plano_de_assinatura_id = ?";
            db.query(query, [plano_id], (err, results) => {
                if (err) return reject(err);
                if (results.length === 0) return resolve(null);
                const alunoData = results[0];
                resolve(new Aluno(alunoData.id, alunoData.nome, alunoData.email, alunoData.senha, alunoData.telefone, alunoData.cpf, alunoData.administrador_id, alunoData.endereco_id, alunoData.plano_de_assinatura_id));
            });
        });
    }

    static async getAllAluno() {
        return new Promise((resolve, reject) => {
            const q = `
                SELECT aluno.*, endereco.estado, endereco.cidade, endereco.cep, endereco.bairro, endereco.logradouro,
                COUNT(CASE WHEN frequencia.checkIn = 1 AND frequencia.checkOut = 1 THEN 1 END) AS total_frequencias
                FROM aluno 
                INNER JOIN endereco ON aluno.endereco_id=endereco.id
                LEFT JOIN frequencia ON aluno.id = frequencia.aluno_id
                GROUP BY aluno.id`;
    
            db.query(q, (err, data) => {
                if (err) return reject(err);
                resolve(data);
            });
        });
    }
    

    async save() {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO aluno (`nome`, `email`, `senha`, `telefone`, `cpf`, `administrador_id`, `endereco_id`, `plano_de_assinatura_id`, `planoAssinaturaAtivo`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

            const values = [this.nome, this.email, this.senha, this.telefone, this.cpf, this.administrador_id, this.endereco_id, null, 0];
            db.query(query, values, (err, results) => {
                if (err) return reject(err);
                this.id = results.insertId;
                resolve();
            });
        });
    }

    async update(id) {
        return new Promise((resolve, reject) => {
            const query = "UPDATE aluno SET `nome` = ?, `email` = ?, `senha` = ?, `telefone` = ?, `cpf` = ?, `administrador_id` = ?, `endereco_id` = ?, `plano_de_assinatura_id` = ?, `planoAssinaturaAtivo` = ? WHERE `id` = ?";
            
            // Definindo planoAssinaturaAtivo com base em plano_de_assinatura_id
            const planoAssinaturaAtivo = this.plano_de_assinatura_id ? 1 : 0;

            const values = [this.nome, this.email, this.senha, this.telefone, this.cpf, this.administrador_id, this.endereco_id, this.plano_de_assinatura_id, planoAssinaturaAtivo, id];
            db.query(query, values, (err, results) => {
                if (err) return reject(err);
                resolve();
            });
        });
    }

    async delete(id) {
        return new Promise((resolve, reject) => {
            const query = "DELETE FROM aluno WHERE `id` = ?";
            db.query(query, [id], (err, results) => {
                if (err) return reject(err);
                resolve();
            });
        });
    }
}