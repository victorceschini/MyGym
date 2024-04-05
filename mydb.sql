CREATE DATABASE  IF NOT EXISTS `mydb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `mydb`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: mydb
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `administrador`
--

DROP TABLE IF EXISTS administrador;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE administrador (
  id int NOT NULL AUTO_INCREMENT,
  nome varchar(45) NOT NULL,
  senha varchar(45) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `aluno`
--

DROP TABLE IF EXISTS aluno;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE aluno (
  id int NOT NULL AUTO_INCREMENT,
  nome varchar(45) NOT NULL,
  cpf varchar(45) NOT NULL,
  telefone varchar(45) DEFAULT NULL,
  endereco_id int NOT NULL,
  email varchar(70) NOT NULL,
  planoAssinaturaAtivo tinyint NOT NULL DEFAULT '0',
  plano_de_assinatura_id int DEFAULT NULL,
  administrador_id int NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY cpf_UNIQUE (cpf),
  KEY fk_aluno_plano_de_assinatura1_idx (plano_de_assinatura_id),
  KEY fk_aluno_administrador1_idx (administrador_id),
  KEY fk_aluno_endereco1_idx (endereco_id),
  CONSTRAINT fk_aluno_administrador1 FOREIGN KEY (administrador_id) REFERENCES administrador (id),
  CONSTRAINT fk_aluno_endereco1 FOREIGN KEY (endereco_id) REFERENCES endereco (id),
  CONSTRAINT fk_aluno_plano_de_assinatura1 FOREIGN KEY (plano_de_assinatura_id) REFERENCES plano_de_assinatura (id)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `aula`
--

DROP TABLE IF EXISTS aula;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE aula (
  id int NOT NULL AUTO_INCREMENT,
  modalidade varchar(45) NOT NULL,
  dias datetime NOT NULL,
  descricao varchar(45) NOT NULL,
  `local` varchar(45) NOT NULL,
  administrador_id int NOT NULL,
  professor_id int NOT NULL,
  PRIMARY KEY (id),
  KEY fk_aula_administrador1_idx (administrador_id),
  KEY fk_aula_professor1_idx (professor_id),
  CONSTRAINT fk_aula_administrador1 FOREIGN KEY (administrador_id) REFERENCES administrador (id),
  CONSTRAINT fk_aula_professor1 FOREIGN KEY (professor_id) REFERENCES professor (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `aula_tem_aluno`
--

DROP TABLE IF EXISTS aula_tem_aluno;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE aula_tem_aluno (
  aula_id int NOT NULL,
  aluno_id int NOT NULL,
  PRIMARY KEY (aula_id,aluno_id),
  KEY fk_aula_has_aluno_aluno1_idx (aluno_id),
  KEY fk_aula_has_aluno_aula1_idx (aula_id),
  CONSTRAINT fk_aula_has_aluno_aluno1 FOREIGN KEY (aluno_id) REFERENCES aluno (id),
  CONSTRAINT fk_aula_has_aluno_aula1 FOREIGN KEY (aula_id) REFERENCES aula (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `avaliacao`
--

DROP TABLE IF EXISTS avaliacao;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE avaliacao (
  id int NOT NULL AUTO_INCREMENT,
  aluno_id int NOT NULL,
  quadril float NOT NULL,
  abdomen float NOT NULL,
  coxa float NOT NULL,
  panturrilha float NOT NULL,
  biceps float NOT NULL,
  antebraco float NOT NULL,
  altura float NOT NULL,
  massa float NOT NULL,
  imc float NOT NULL,
  `data` date NOT NULL,
  professor_id int NOT NULL,
  PRIMARY KEY (id),
  KEY fk_avaliacao_aluno1_idx (aluno_id),
  KEY fk_avaliacao_professor1_idx (professor_id),
  CONSTRAINT fk_avaliacao_aluno1 FOREIGN KEY (aluno_id) REFERENCES aluno (id),
  CONSTRAINT fk_avaliacao_professor1 FOREIGN KEY (professor_id) REFERENCES professor (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `endereco`
--

DROP TABLE IF EXISTS endereco;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE endereco (
  id int NOT NULL AUTO_INCREMENT,
  cep varchar(45) NOT NULL,
  logradouro varchar(45) NOT NULL,
  cidade varchar(45) NOT NULL,
  bairro varchar(45) NOT NULL,
  estado varchar(45) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `equipamento`
--

DROP TABLE IF EXISTS equipamento;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE equipamento (
  id int NOT NULL AUTO_INCREMENT,
  nome varchar(45) NOT NULL,
  ultimaManutencao date DEFAULT NULL,
  disponivel tinyint NOT NULL,
  fornecedor varchar(45) NOT NULL,
  marca varchar(45) NOT NULL,
  administrador_id int NOT NULL,
  PRIMARY KEY (id),
  KEY fk_equipamento_administrador1_idx (administrador_id),
  CONSTRAINT fk_equipamento_administrador1 FOREIGN KEY (administrador_id) REFERENCES administrador (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `exercicio`
--

DROP TABLE IF EXISTS exercicio;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE exercicio (
  id int NOT NULL AUTO_INCREMENT,
  nome varchar(45) NOT NULL,
  series tinyint NOT NULL,
  repeticoes int NOT NULL,
  intervaloSeries int NOT NULL,
  equipamento_id int NOT NULL,
  PRIMARY KEY (id),
  KEY fk_exercicio_equipamento1_idx (equipamento_id),
  CONSTRAINT fk_exercicio_equipamento1 FOREIGN KEY (equipamento_id) REFERENCES equipamento (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `frequencia`
--

DROP TABLE IF EXISTS frequencia;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE frequencia (
  id int NOT NULL AUTO_INCREMENT,
  aluno_id int NOT NULL,
  `dataInício` date DEFAULT NULL,
  checkin tinyint NOT NULL,
  checkout tinyint NOT NULL,
  dataFim date NOT NULL,
  PRIMARY KEY (id),
  KEY `fk_Frequência_Aluno_idx` (aluno_id),
  CONSTRAINT `fk_Frequência_Aluno` FOREIGN KEY (aluno_id) REFERENCES aluno (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `plano_de_assinatura`
--

DROP TABLE IF EXISTS plano_de_assinatura;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE plano_de_assinatura (
  id int NOT NULL AUTO_INCREMENT,
  nome varchar(45) NOT NULL,
  valor decimal(15,2) NOT NULL,
  descricao varchar(255) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `professor`
--

DROP TABLE IF EXISTS professor;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE professor (
  id int NOT NULL AUTO_INCREMENT,
  nome varchar(45) NOT NULL,
  cpf varchar(45) NOT NULL,
  telefone varchar(45) NOT NULL,
  endereco_id int NOT NULL,
  email varchar(45) NOT NULL,
  formacaoAcademica varchar(45) NOT NULL,
  PRIMARY KEY (id),
  KEY fk_professor_endereco1_idx (endereco_id),
  CONSTRAINT fk_professor_endereco1 FOREIGN KEY (endereco_id) REFERENCES endereco (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `rotina_de_exercicios`
--

DROP TABLE IF EXISTS rotina_de_exercicios;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE rotina_de_exercicios (
  id int NOT NULL AUTO_INCREMENT,
  aluno_id int NOT NULL,
  professor_id int NOT NULL,
  descricao varchar(45) NOT NULL,
  `data` date NOT NULL,
  ativo tinyint NOT NULL,
  PRIMARY KEY (id),
  KEY fk_rotina_de_exercicios_aluno1_idx (aluno_id),
  KEY fk_rotina_de_exercicios_professor1_idx (professor_id),
  CONSTRAINT fk_rotina_de_exercicios_aluno1 FOREIGN KEY (aluno_id) REFERENCES aluno (id),
  CONSTRAINT fk_rotina_de_exercicios_professor1 FOREIGN KEY (professor_id) REFERENCES professor (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `rotina_tem_exercicio`
--

DROP TABLE IF EXISTS rotina_tem_exercicio;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE rotina_tem_exercicio (
  rotina_de_exercicios_id int NOT NULL,
  exercicio_id int NOT NULL,
  PRIMARY KEY (rotina_de_exercicios_id,exercicio_id),
  KEY fk_rotina_de_exercicios_has_exercicio_exercicio1_idx (exercicio_id),
  KEY fk_rotina_de_exercicios_has_exercicio_rotina_de_exercicios1_idx (rotina_de_exercicios_id),
  CONSTRAINT fk_rotina_de_exercicios_has_exercicio_exercicio1 FOREIGN KEY (exercicio_id) REFERENCES exercicio (id),
  CONSTRAINT fk_rotina_de_exercicios_has_exercicio_rotina_de_exercicios1 FOREIGN KEY (rotina_de_exercicios_id) REFERENCES rotina_de_exercicios (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-05 18:18:15
