import express from "express";
import loginRoutes from "./routes/login.js";
import alunoRoutes from "./routes/aluno.js";
import planoRoutes from "./routes/plano.js";
import frequenciaRoutes from "./routes/frequencia.js";
import aulaRoutes from "./routes/aula.js";
import professorRoutes from "./routes/professor.js";
import avaliacaoRoutes from "./routes/avaliacao.js";
import equipamentoRoutes from "./routes/equipamento.js";
import rotinaRoutes from "./routes/rotina.js";
import exercicioRoutes from "./routes/exercicio.js";

import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use(loginRoutes);
app.use(alunoRoutes);
app.use(planoRoutes);
app.use(frequenciaRoutes);
app.use(aulaRoutes);
app.use(professorRoutes);
app.use(avaliacaoRoutes);
app.use(equipamentoRoutes);
app.use(rotinaRoutes);
app.use(exercicioRoutes)
app.listen(8800);
