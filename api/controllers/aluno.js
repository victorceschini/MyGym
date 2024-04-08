import { Aluno } from "../classes/Aluno.js";
import { Endereco } from "../classes/Endereco.js";

export const getAluno = async (_req, res) => {
    try {
        const alunos = await Aluno.getAllAluno();
        return res.status(200).json(alunos);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export const addAluno = async (req, res) => {
    try {
        const { nome, email, senha, telefone, cpf, administrador_id, estado, cidade, cep, bairro, logradouro } = req.body;

        const endereco = new Endereco(null, estado, cidade, cep, bairro, logradouro);
        const endereco_id = await endereco.save();

        const aluno = new Aluno(null, nome, email, senha, telefone, cpf, administrador_id, endereco_id, 1);
        await aluno.save();
        
        return res.status(200).json("Aluno criado com sucesso!");
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: "CPF já registrado para outro aluno." });
        }
        return res.status(500).json({ error: err.message });
    }
};

export const updateAluno = async (req, res) => {
    try {
        const { cpf, nome, email, senha, telefone, estado, cidade, cep, bairro, logradouro } = req.body;

        const aluno_id = req.params.id;

        const aluno = await Aluno.getObjectAluno(null, aluno_id);

        if (!aluno) {
            return res.status(404).json({ error: "Aluno não encontrado." });
        }

        aluno.nome = nome;
        aluno.email = email;
        aluno.senha = senha;
        aluno.telefone = telefone;
        aluno.cpf = cpf;
        
        const endereco = await Endereco.getObjectEndereco(aluno.endereco_id)

        if (!endereco) {
            return res.status(404).json({ error: "Endereço não encontrado." });
        }

        endereco.estado = estado;
        endereco.cidade = cidade;
        endereco.cep = cep;
        endereco.bairro = bairro;
        endereco.logradouro = logradouro;

        await aluno.update(aluno.id);
        await endereco.update(endereco.id);
        
        return res.status(200).json("Aluno atualizado com sucesso!");
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export const deleteAluno = async (req, res) => {
    try {
        const aluno_id = req.params.id;
        
        const aluno = await Aluno.getObjectAluno(null, aluno_id);

        if (!aluno) {
            return res.status(404).json({ error: "Aluno não encontrado." });
        }
        
        const endereco = await Endereco.getObjectEndereco(aluno.endereco_id);
        if (!endereco) {
            return res.status(404).json({ error: "Endereço não encontrado." });
        }

        await aluno.delete(aluno.id);
        await endereco.delete(endereco.id);
        
        return res.status(200).json("Aluno deletado com sucesso!");
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
