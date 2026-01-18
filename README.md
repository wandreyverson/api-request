# API Request

API de gerenciamento de pedidos com Node.js, TypeScript, SQL Server via Docker e documentação Swagger.

---

## 🔹 Pré-requisitos

Antes de rodar o projeto, você precisa ter instalado:

- **Node.js** (versão 16 ou superior)
- **Docker** e **Docker Compose** (para rodar o SQL Server)
- **npm** ou **yarn** (para gerenciar dependências)
- Um editor de código como **VS Code** (para depuração)

---

## 🔹 Instalação do projeto

Clone o repositório e instale as dependências:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/wandreyverson/order-registration.git
    cd order-registration
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```
---

## 🔹 Configuração do ambiente

Crie um arquivo .env na raiz do projeto com as seguintes variáveis:

DB_USER=sa
DB_PASSWORD=MinhaSenhaForte123!
DB_SERVER=localhost
DB_DATABASE=goop
DB_PORT=1433

MSSQL_SA_PASSWORD=MinhaSenhaForte123!
MSSQL_PORT=1433

---

## 🔹 Inicializando o banco de dados via Docker

Certifique-se de que o Docker está rodando e execute:

npm run docker:compose

Em seguida, inicialize o banco:

npm run db:init

---

## 🔹 Migrações com TypeORM

Caso seja a primeira vez ou haja mudanças no schema:

npm run migration:generate

Para aplicar as migrações no banco:

npm run migration:run

---

## 🔹 Rodando o servidor em desenvolvimento

npm run dev

O servidor estará disponível em:

http://localhost:3000

## 🔹 Acessando a API

A documentação completa da API está disponível via Swagger:

http://localhost:3000/docs/

---

## 🔹 Como criar um usuário

1 - Acesse a rota de criação de usuário no Swagger.

2 - Use o endpoint para registrar um novo usuário api/auth/register.

3 - Após o registro, utilize as credenciais para autenticar e acessar outras rotas.

## 🔹 Comandos úteis

npm run dev - Inicia o servidor em modo dev com depuração

npm run docker:compose - Sobe o SQL Server via Docker

npm run db:init - Inicializa o banco de dados

npm run db:init - Inicializa o banco de dados

npm run migration:run - Aplica as migrações no banco

---

## 🔹 Dicas

Sempre atualize o .env antes de rodar o projeto.

Para qualquer problema de conexão com o SQL Server, verifique se o Docker está rodando e se a senha do SA está correta.

Use a documentação Swagger para testar endpoints sem precisar do frontend.

