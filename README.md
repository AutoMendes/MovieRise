# 🎬 Projeto MovieRise – Node + Express + React

## 📚 Descrição

Este projeto foi desenvolvido no âmbito da Unidade Curricular **Aplicações para a Internet II** (2.º Ano / 2.º Semestre, Ano Letivo 2024/2025) da **Escola Superior de Tecnologia do Instituto Politécnico de Viseu**.

A aplicação consiste numa solução completa com **backend** em Node.js + Express e **frontend** em React, com base de dados PostgreSQL e uso do ORM Sequelize.

---

## 🚀 Exercício 1 – Base de Dados em PostgreSQL + Sequelize

1. Criação de uma base de dados chamada `ai2` no servidor PostgreSQL.

2. Utilização do Sequelize para criar:
   - Uma tabela `filmes` com os campos: `id`, `título`, `descrição`, `foto` e `género`.
   - Uma tabela `generos` com os campos: `id` e `descrição`.

> **Nota:** Cada filme pertence a um único género (ex: drama, comédia, etc.).

---

## 🛠️ Exercício 2 – Backend em Node.js + Express

### Estrutura do Projeto

O projeto segue a arquitetura **MVC (Model-View-Controller)** e encontra-se na pasta `src`.

Foram implementados todos os controladores, rotas e modelos necessários para a gestão de filmes e géneros.

### Endpoints da API

| Método HTTP | Endpoint                                | Função no Controlador | Descrição                                                 |
|-------------|------------------------------------------|------------------------|-----------------------------------------------------------|
| GET         | `/filmes/list`                          | `filme_list`           | Retorna todos os filmes existentes na base de dados.      |
| GET         | `/filme/get/:id`                        | `filme_detail`         | Retorna os dados de um filme específico pelo ID.          |
| POST        | `/filme/create`                         | `filme_create`         | Cria um novo filme com os dados recebidos.                |
| PUT         | `/filme/update/:id`                     | `filme_update`         | Atualiza os dados de um filme existente com base no ID.   |

---

## 💻 Exercício 3 – FrontEnd em React

O projeto frontend encontra-se na pasta `frontend`, desenvolvido com React.

### Componentes e Vistas

Foram desenvolvidas as seguintes páginas:

- 📄 Página de listagem de filmes
- ➕ Página de inserção de um novo filme
- ✏️ Página de edição de um filme já existente

### Funcionalidades Implementadas

- Visualização de todos os filmes registados
- Inserção de novos filmes
- Edição dos dados de um filme existente

> As páginas estáticas da Ficha 2 foram adaptadas ao ambiente React.

---

## 🧑‍💻 Tecnologias Utilizadas

- **Backend:** Node.js, Express, Sequelize
- **Base de Dados:** PostgreSQL
- **Frontend:** React.js
- **Arquitetura:** MVC

---

## 📫 Contacto

Este projeto foi desenvolvido no contexto académico da disciplina **Aplicações para a Internet II**.

