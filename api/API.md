# Documentação da API

Esta é a documentação para a API do projeto Hubfy.

## Autenticação

A autenticação é feita via JWT. Para acessar as rotas protegidas, você deve incluir o token de acesso no cabeçalho `Authorization` como um `Bearer` token.

### Obter Token de Acesso

- **POST** `/sessions`

  Autentica um usuário e retorna um token de acesso.

  **Corpo da Requisição:**

  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

  **Resposta de Sucesso (201):**

  ```json
  {
    "accessToken": "ey..."
  }
  ```

---

## Usuário

Endpoints para gerenciar usuários.

### Criar Novo Usuário

- **POST** `/users`

  Cria um novo usuário no sistema.

  **Corpo da Requisição:**

  ```json
  {
    "name": "Nome do Usuário",
    "email": "user@example.com",
    "password": "password123"
  }
  ```

  **Resposta de Sucesso (201):**

  ```json
  {
    "userId": "uuid-do-usuario"
  }
  ```

### Obter Perfil do Usuário

- **GET** `/me`

  Retorna os detalhes do usuário autenticado.

  **Autenticação:** Obrigatória.

  **Resposta de Sucesso (200):**

  ```json
  {
    "user": {
      "id": "uuid-do-usuario",
      "name": "Nome do Usuário",
      "email": "user@example.com",
      "createdAt": "2025-12-17T12:00:00.000Z"
    }
  }
  ```

---

## Tarefas (Tasks)

Endpoints para gerenciar tarefas.

### Criar Nova Tarefa

- **POST** `/tasks`

  Cria uma nova tarefa para o usuário autenticado.

  **Autenticação:** Obrigatória.

  **Corpo da Requisição:**

  ```json
  {
    "title": "Título da Tarefa",
    "description": "Descrição opcional da tarefa",
    "status": "pending"
  }
  ```

  **Resposta de Sucesso (201):**

  ```json
  {
    "taskId": "uuid-da-tarefa"
  }
  ```

### Listar Todas as Tarefas

- **GET** `/tasks`

  Retorna todas as tarefas do usuário autenticado.

  **Autenticação:** Obrigatória.

  **Resposta de Sucesso (200):**

  ```json
  {
    "tasks": [
      {
        "id": "uuid-da-tarefa",
        "userId": "uuid-do-usuario",
        "title": "Título da Tarefa",
        "description": "Descrição da tarefa",
        "status": "pending",
        "slug": "titulo-da-tarefa",
        "createdAt": "2025-12-17T12:00:00.000Z",
        "updatedAt": "2025-12-17T12:00:00.000Z"
      }
    ]
  }
  ```

### Obter Detalhes da Tarefa

- **GET** `/tasks/:slug`

  Retorna os detalhes de uma tarefa específica.

  **Autenticação:** Obrigatória.

  **Resposta de Sucesso (200):**

  ```json
  {
    "task": {
      "id": "uuid-da-tarefa",
      "userId": "uuid-do-usuario",
      "title": "Título da Tarefa",
      "description": "Descrição da tarefa",
      "status": "pending",
      "slug": "titulo-da-tarefa",
      "createdAt": "2025-12-17T12:00:00.000Z",
      "updatedAt": "2025-12-17T12:00:00.000Z"
    }
  }
  ```

### Atualizar Tarefa

- **PUT** `/tasks/:slug`

  Atualiza o título, descrição e status de uma tarefa.

  **Autenticação:** Obrigatória.

  **Corpo da Requisição:**

  ```json
  {
    "title": "Novo Título da Tarefa",
    "description": "Nova descrição da tarefa",
    "status": "in_progress"
  }
  ```

  **Resposta de Sucesso (204):** Sem conteúdo.

### Atualizar Status da Tarefa

- **PATCH** `/tasks/:slug/status`

  Atualiza apenas o status de uma tarefa.

  **Autenticação:** Obrigatória.

  **Corpo da Requisição:**

  ```json
  {
    "status": "completed"
  }
  ```

  **Resposta de Sucesso (204):** Sem conteúdo.

### Excluir Tarefa

- **DELETE** `/tasks/:slug`

  Exclui uma tarefa.

  **Autenticação:** Obrigatória.

  **Resposta de Sucesso (204):** Sem conteúdo.
