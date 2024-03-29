import { db } from "../db.js";

export const Authenticator = (req, res) => {
    const { username, password } = req.body;

    const q = "SELECT * FROM administrador WHERE nome = ? AND senha = ?";
    db.query(q, [username, password], (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Erro no servidor" });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: "Credenciais inválidas" });
        }

        // O usuário foi encontrado no banco de dados
        const user = results[0];
        return res.status(200).json(user);
    });
};
