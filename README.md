# Hubfy Test Project

![Captura de tela de 2025-12-17 10-48-31.png](.github/images/Captura%20de%20tela%20de%202025-12-17%2010-48-31.png)
![Captura de tela de 2025-12-17 10-48-39.png](.github/images/Captura%20de%20tela%20de%202025-12-17%2010-48-39.png)
![Captura de tela de 2025-12-17 10-50-13.png](.github/images/Captura%20de%20tela%20de%202025-12-17%2010-50-13.png)
![Captura de tela de 2025-12-17 10-50-21.png](.github/images/Captura%20de%20tela%20de%202025-12-17%2010-50-21.png)
![Captura de tela de 2025-12-17 10-52-16.png](.github/images/Captura%20de%20tela%20de%202025-12-17%2010-52-16.png)
![Captura de tela de 2025-12-17 10-52-26.png](.github/images/Captura%20de%20tela%20de%202025-12-17%2010-52-26.png)
![Captura de tela de 2025-12-17 10-52-35.png](.github/images/Captura%20de%20tela%20de%202025-12-17%2010-52-35.png)
![Captura de tela de 2025-12-17 10-52-52.png](.github/images/Captura%20de%20tela%20de%202025-12-17%2010-52-52.png)
![Captura de tela de 2025-12-17 10-53-11.png](.github/images/Captura%20de%20tela%20de%202025-12-17%2010-53-11.png)

Este projeto consiste em uma API e uma aplicação web.

## API

A API é construída com Node.js, Fastify e Drizzle ORM.

### Tecnologias da API

- **Node.js:** Ambiente de execução JavaScript.
- **Fastify:** Framework web para Node.js.
- **Drizzle ORM:** ORM TypeScript para bancos de dados SQL.
- **TypeScript:** Superset de JavaScript que adiciona tipagem estática.
- **Zod:** Biblioteca de validação de esquemas.
- **Docker:** Plataforma de containerização.
- **MySQL:** Banco de dados relacional.

### Arquitetura de Arquivos (API)

A estrutura de arquivos da API segue uma abordagem de Domínio-Serviço, separando as responsabilidades em camadas:

```
/api
├── src
│   ├── core/           # Lógica de negócio principal e entidades
│   ├── domain/         # Casos de uso, entidades de domínio e repositórios
│   │   ├── use-cases/  # Lógica de aplicação específica
│   │   ├── entities/   # Entidades de negócio
│   │   └── repositories/ # Abstrações para acesso a dados
│   ├── env/            # Configuração de variáveis de ambiente
│   └── http/           # Camada de apresentação (HTTP)
│       ├── routes/     # Definição das rotas da API
│       ├── db/         # Configuração e migrações do banco de dados
│       └── cryptography/ # Implementações de criptografia
└── ...
```

### Executando a API

1.  **Navegue até o diretório da API:**

    ```bash
    cd api
    ```

2.  **Instale as dependências:**

    ```bash
    pnpm install
    ```

3.  **Inicie o banco de dados com Docker Compose:**

    ```bash
    docker-compose up -d
    ```

4.  **Execute as migrações do banco de dados:**

    ```bash
    pnpm db:migrate
    ```

5.  **Execute as seeds do banco de dados:**

    ```bash
    pnpm db:seed
    ```

6.  **Inicie o servidor de desenvolvimento:**

    ```bash
    pnpm dev
    ```

O servidor da API estará rodando em `http://localhost:3333`.
O doc swagger da API estará rodando em `http://localhost:3333/docs`.

### Executando os Testes

-   **Testes Unitários:**
    ```bash
    pnpm test:unit
    ```

-   **Testes E2E:**
    ```bash
    pnpm test:e2e
    ```

## Web

A aplicação web é construída com Next.js e TypeScript.

### Tecnologias da Web

- **Next.js:** Framework React para produção.
- **React:** Biblioteca JavaScript para construção de interfaces de usuário.
- **TypeScript:** Superset de JavaScript que adiciona tipagem estática.
- **Tailwind CSS:** Framework CSS utilitário.
- **Shadcn/ui:** Componentes de UI para React.

### Arquitetura de Arquivos (Web)

A aplicação web usa a estrutura de diretórios do Next.js App Router.

```
/web
├── src
│   ├── app/            # Rotas da aplicação (App Router)
│   │   ├── (app)/      # Rotas principais da aplicação
│   │   ├── auth/       # Rotas de autenticação
│   │   └── layout.tsx  # Layout principal
│   ├── components/     # Componentes React reutilizáveis
│   │   └── ui/         # Componentes de UI (ex: botões, inputs)
│   ├── http/           # Funções para fazer chamadas à API
│   ├── lib/            # Funções utilitárias e configuração de API
│   └── hooks/          # Hooks React customizados
└── ...
```

### Executando a Aplicação Web

1.  **Navegue até o diretório da web:**

    ```bash
    cd web
    ```

2.  **Instale as dependências:**

    ```bash
    pnpm install
    ```

3.  **Inicie o servidor de desenvolvimento:**

    ```bash
    pnpm dev
    ```

A aplicação web estará rodando em `http://localhost:3000`.
