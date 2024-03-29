import express from "express";
import alunoRoutes from "./routes/aluno.js";
import loginRoutes from "./routes/login.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
app.use(loginRoutes);

app.use(alunoRoutes);

app.listen(8800);