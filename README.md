# Requisitos

- Node JS
- MySQL Workbench
- Yarn

# MySQL Workbench

no main, tem o script para criar o schema, após executar e criar esse schema, execute o seguinte código:

```
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'awspass123';
```

# Instalação Backend
```
cd api
npm init -y
```

```
yarn add express nodemon mysql cors
```

- Mudar em package.json a parte de scripts. deixando assim:
```
"scripts": {
  "start": "nodemon index.js"
},
```

- Adicionar em package.json, logo abaixo de "main":
```
"type": "module",
```

# Instalação Frontend
```
cd frontend
npx create-react-app ./
```

```
yarn add styled-components axios react-icons react-toastify
```

- deletar os arquivos criados que não estão presentes no repositório do git
- talvez os arquivos sejam substituídos por conta desses comandos, então verifique se, ao final, os arquivos estão similares aos do repositório

# Inicializar

- Para iniciar, abra dois terminais (No VsCode, abra o cmd ao invés de powershell) e digite:
```
cd api
yarn start
```

```
cd frontend
yarn start
```