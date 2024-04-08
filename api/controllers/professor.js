import { Professor } from "../classes/Professor.js";
import { Endereco } from "../classes/Endereco.js";

export const getProfessor = async (_req, res) => {
    try {
        const professores = await Professor.getAllProfessor();
        return res.status(200).json(professores);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export const addProfessor = async (req, res) => {
    try {
        const { nome, email, senha, telefone, cpf, formacaoAcademica, estado, cidade, cep, bairro, logradouro } = req.body;

        const endereco = new Endereco(null, estado, cidade, cep, bairro, logradouro);
        const endereco_id = await endereco.save();

        const professor = new Professor(null, nome, email, senha, telefone, cpf, formacaoAcademica, endereco_id);
        await professor.save();
        
        return res.status(200).json("Professor criado com sucesso!");
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: "CPF já registrado para outro professor." });
        }
        return res.status(500).json({ error: err.message });
    }
};

export const updateProfessor = async (req, res) => {
    try {
        const { nome, email, senha, telefone, cpf, formacaoAcademica, estado, cidade, cep, bairro, logradouro } = req.body;
        
        const professor_id = req.params.id;

        const professor = await Professor.getObjectProfessor(professor_id);

        if (!professor) {
            return res.status(404).json({ error: "Professor não encontrado." });
        }

        professor.nome = nome;
        professor.email = email;
        professor.senha = senha;
        professor.telefone = telefone;
        professor.cpf = cpf;
        professor.formacao = formacaoAcademica;
        
        const endereco = await Endereco.getObjectEndereco(professor.endereco_id)

        if (!endereco) {
            return res.status(404).json({ error: "Endereço não encontrado." });
        }

        endereco.estado = estado;
        endereco.cidade = cidade;
        endereco.cep = cep;
        endereco.bairro = bairro;
        endereco.logradouro = logradouro;

        await professor.update(professor_id);
        await endereco.update(endereco.id);
        
        return res.status(200).json("Professor atualizado com sucesso!");
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export const deleteProfessor = async (req, res) => {
    try {
        const professor_id = req.params.id;
        
        const professor = await Professor.getObjectProfessor(professor_id);

        if (!professor) {
            return res.status(404).json({ error: "Professor não encontrado." });
        }
        
        const endereco = await Endereco.getObjectEndereco(professor.endereco_id);
        if (!endereco) {
            return res.status(404).json({ error: "Endereço não encontrado." });
        }

        await professor.delete(professor_id);
        await endereco.delete(endereco.id);
        
        return res.status(200).json("Professor deletado com sucesso!");
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
