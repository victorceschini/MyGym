import { db } from "../db.js";

export const Authenticator = (req, res) => {
    const { username, password } = req.body;

    const adminQuery = "SELECT * FROM administrador WHERE nome = ? AND senha = ?";
    const alunoQuery = "SELECT * FROM aluno WHERE nome = ? AND senha = ?";

    // Verifica se é um administrador
    db.query(adminQuery, [username, password], (err, adminResults) => {
        return res.status(200).json({ userType: "admin", user: "user" });
        if (err) {
            return res.status(500).json({ message: "Erro no servidor" });
        }

        if (adminResults.length > 0) {
            // O usuário é um administrador
            const adminUser = adminResults[0];
            return res.status(200).json({ userType: "admin", user: adminUser });
        } else {
            // Verifica se é um aluno
            db.query(alunoQuery, [username, password], (err, alunoResults) => {
                if (err) {
                    return res.status(500).json({ message: "Erro no servidor" });
                }

                if (alunoResults.length > 0) {
                    // O usuário é um aluno
                    const alunoUser = alunoResults[0];
                    return res.status(200).json({ userType: "aluno", user: alunoUser });
                } else {
                    // Credenciais inválidas
                    return res.status(401).json({ message: "Credenciais inválidas" });
                }
            });
        }
    });
};
