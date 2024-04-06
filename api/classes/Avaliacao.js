import { db } from "../db.js";

export class Avaliacao {
    constructor(
        id,
        aluno_id,
        quadril,
        abdomen,
        coxa,
        panturilha,
        biceps,
        antebraco,
        altura,
        massa,
        data,
        professor_id
    ) {
        this.id = id;
        this.aluno_id = aluno_id;
        this.quadril = quadril;
        this.abdomen = abdomen;
        this.coxa = coxa;
        this.panturilha = panturilha;
        this.biceps = biceps;
        this.antebraco = antebraco;
        this.altura = altura;
        this.massa = massa;
        this.imc = this.calcularIMC(altura, massa);
        this.data = data;
        this.professor_id = professor_id;
    }

    calcularIMC(altura, massa) {
        return massa / altura ** 2;
    }

    static async getObjectAvaliacao(id) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM avaliacao WHERE id = ?";
            db.query(query, [id], (err, results) => {
                if (err) return reject(err);
                if (results.length === 0) return resolve(null);
                const avaliacaoData = results[0];
                resolve(
                    new Avaliacao(
                        avaliacaoData.id,
                        avaliacaoData.aluno_id,
                        avaliacaoData.quadril,
                        avaliacaoData.abdomen,
                        avaliacaoData.coxa,
                        avaliacaoData.panturilha,
                        avaliacaoData.biceps,
                        avaliacaoData.antebraco,
                        avaliacaoData.altura,
                        avaliacaoData.massa,
                        avaliacaoData.data,
                        avaliacaoData.professor_id
                    )
                );
            });
        });
    }

    static async getAvaliacaoByAluno(aluno_id) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM avaliacao WHERE aluno_id = ?";
            db.query(query, [aluno_id], (err, results) => {
                if (err) return reject(err);
                if (results.length === 0) return resolve(null);
                const avaliacaoData = results[0];
                resolve(
                    new Avaliacao(
                        avaliacaoData.id,
                        avaliacaoData.aluno_id,
                        avaliacaoData.quadril,
                        avaliacaoData.abdomen,
                        avaliacaoData.coxa,
                        avaliacaoData.panturilha,
                        avaliacaoData.biceps,
                        avaliacaoData.antebraco,
                        avaliacaoData.altura,
                        avaliacaoData.massa,
                        avaliacaoData.data,
                        avaliacaoData.professor_id
                    )
                );
            });
        });
    }

    static async getAvaliacaoByProfessor(professor_id) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM avaliacao WHERE professor_id = ?";
            db.query(query, [professor_id], (err, results) => {
                if (err) return reject(err);
                if (results.length === 0) return resolve(null);
                const avaliacaoData = results[0];
                resolve(
                    new Avaliacao(
                        avaliacaoData.id,
                        avaliacaoData.aluno_id,
                        avaliacaoData.quadril,
                        avaliacaoData.abdomen,
                        avaliacaoData.coxa,
                        avaliacaoData.panturilha,
                        avaliacaoData.biceps,
                        avaliacaoData.antebraco,
                        avaliacaoData.altura,
                        avaliacaoData.massa,
                        avaliacaoData.data,
                        avaliacaoData.professor_id
                    )
                );
            });
        });
    }

    async save() {
        return new Promise((resolve, reject) => {
            const query =
                "INSERT INTO avaliacao (`aluno_id`, `quadril`, `abdomen`, `coxa`, `panturilha`, `biceps`, `antebraco`, `altura`, `massa`, `imc`, `data`, `professor_id`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            const values = [
                (this.aluno_id = aluno_id),
                (this.quadril = quadril),
                (this.abdomen = abdomen),
                (this.coxa = coxa),
                (this.panturilha = panturilha),
                (this.biceps = biceps),
                (this.antebraco = antebraco),
                (this.altura = altura),
                (this.massa = massa),
                (this.imc = imc),
                (this.data = data),
                (this.professor_id = professor_id),
            ];
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
                "UPDATE avaliacao SET `aluno_id` = ? , `quadril` = ?, `abdomen` = ?, `coxa` = ?, `panturilha` = ?, `biceps` = ?, `antebraco` = ?, `altura` = ?, `massa` = ?, `imc` = ?, `data` = ?, `professor_id` = ? WHERE `id` = ?";
            const values = [
                (this.aluno_id = aluno_id),
                (this.quadril = quadril),
                (this.abdomen = abdomen),
                (this.coxa = coxa),
                (this.panturilha = panturilha),
                (this.biceps = biceps),
                (this.antebraco = antebraco),
                (this.altura = altura),
                (this.massa = massa),
                (this.imc = imc),
                (this.data = data),
                (this.professor_id = professor_id),
                id,
            ];
            db.query(query, values, (err, results) => {
                if (err) return reject(err);
                resolve();
            });
        });
    }

    async delete(id) {
        return new Promise((resolve, reject) => {
            const query = "DELETE FROM avaliacao WHERE `id` = ?";
            db.query(query, [id], (err, results) => {
                if (err) return reject(err);
                resolve();
            });
        });
    }
}
