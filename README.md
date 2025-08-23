# Desafio XPE - Módulo 5 -API REST - Sistema de Vendas Online MVC

## 📋 Descrição do Projeto

Este projeto é o desafio final do Bootcamp: Arquitetura de software da EXP, e implementa uma API RESTful seguindo o padrão arquitetural MVC (Model-View-Controller) para um sistema de vendas online. A API disponibiliza endpoints para gerenciamento de **Clientes**, **Produtos** e **Pedidos**, permitindo operações CRUD completas e funcionalidades adicionais conforme especificado no desafio.

## 🏗️ Arquitetura do Software

Para ver o diagrama C4 Model deste projeto, import o arquivo diagrama.grawio para o site

### Padrão Arquitetural MVC

O projeto segue estritamente o padrão MVC com as seguintes responsabilidades:

- **Model**: Representa as entidades de negócio (Cliente, Produto, Pedido)
- **View**: Representada pelos Controllers que formatam a resposta HTTP
- **Controller**: Gerencia as requisições HTTP e coordena as operações
- **Service**: Contém a lógica de negócio
- **Repository**: Gerencia a persistência de dados

## 📁 Estrutura de Pastas e Componentes

```
XPE-DESF5-Desafio-Final/
├── src/
│   ├── main.ts                 # Ponto de entrada da aplicação
│   ├── routes.ts               # Roteamento principal
│   ├── db/
│   │   ├── client.ts           # Configuração do banco de dados
│   │   └── schema.ts           # Schema das tabelas (Drizzle ORM)
│   └── modules/
│       ├── clientes/           # Módulo de Clientes
│       │   ├── clientes.controller.ts
│       │   ├── clientes.service.ts
│       │   ├── clientes.repository.ts
│       │   ├── clientes.model.ts
│       │   └── clientes.routes.ts
│       ├── produtos/           # Módulo de Produtos
│       │   ├── produto.controller.ts
│       │   ├── produto.service.ts
│       │   ├── produto.repository.ts
│       │   ├── produto.model.ts
│       │   └── produto.routes.ts
│       └── pedidos/            # Módulo de Pedidos
│           ├── pedidos.controller.ts
│           ├── pedidos.service.ts
│           ├── pedidos.repository.ts
│           ├── pedidos.model.ts
│           └── pedidos.routes.ts
├── drizzle/                    # Migrações do banco de dados
├── compose.yaml                # Configuração Docker
└── package.json                # Dependências do projeto
```

### Explicação dos Componentes

#### 📂 **src/main.ts**

- **Responsabilidade**: Ponto de entrada da aplicação
- **Função**: Configura o servidor Express, middleware e inicia a aplicação na porta 3000

#### 📂 **src/routes.ts**

- **Responsabilidade**: Roteamento principal da aplicação
- **Função**: Centraliza todas as rotas dos módulos (clientes, produtos, pedidos)

#### 📂 **src/db/**

- **client.ts**: Configuração da conexão com PostgreSQL usando Drizzle ORM
- **schema.ts**: Definição das tabelas do banco de dados com relacionamentos

#### 📂 **src/modules/[entidade]/**

##### **Controller** (`*.controller.ts`)

- **Responsabilidade**: Camada de apresentação (View no MVC)
- **Função**:
  - Recebe requisições HTTP
  - Valida dados de entrada
  - Chama os serviços apropriados
  - Formata e retorna respostas HTTP

##### **Service** (`*.service.ts`)

- **Responsabilidade**: Camada de lógica de negócio
- **Função**:
  - Implementa regras de negócio
  - Validações complexas
  - Orquestra operações entre repositories
  - Tratamento de erros de negócio

##### **Repository** (`*.repository.ts`)

- **Responsabilidade**: Camada de acesso a dados
- **Função**:
  - Operações CRUD no banco de dados
  - Queries complexas
  - Mapeamento entre entidades e tabelas

##### **Model** (`*.model.ts`)

- **Responsabilidade**: Entidades de domínio (Model no MVC)
- **Função**:
  - Define a estrutura dos dados
  - Validações básicas
  - Comportamentos das entidades

##### **Routes** (`*.routes.ts`)

- **Responsabilidade**: Definição das rotas HTTP
- **Função**:
  - Mapeia URLs para controllers
  - Define métodos HTTP (GET, POST, PATCH, DELETE)

## 🚀 Funcionalidades Implementadas

### ✅ Requisitos Atendidos

1. **✅ CRUD Completo**: Create, Read, Update, Delete para todas as entidades
2. **✅ Contagem**: Endpoint para retornar número total de registros
3. **✅ Find All**: Endpoint para retornar todos os registros
4. **✅ Find By ID**: Endpoint para retornar registro específico por ID
5. **✅ Find By Name**: Endpoint para buscar registros por nome
6. **✅ Persistência**: Banco de dados PostgreSQL com Drizzle ORM
7. **✅ Arquitetura MVC**: Separação clara de responsabilidades

### 📊 Endpoints da API

#### **Clientes** (`/clientes`)

| Método   | Endpoint          | Descrição                                              |
| -------- | ----------------- | ------------------------------------------------------ |
| `GET`    | `/clientes`       | Lista todos os clientes (com filtro opcional por nome) |
| `GET`    | `/clientes/count` | Retorna o total de clientes                            |
| `GET`    | `/clientes/:id`   | Busca cliente por ID                                   |
| `POST`   | `/clientes`       | Cria novo cliente                                      |
| `PATCH`  | `/clientes/:id`   | Atualiza cliente existente                             |
| `DELETE` | `/clientes/:id`   | Remove cliente                                         |

#### **Produtos** (`/produtos`)

| Método   | Endpoint          | Descrição                                              |
| -------- | ----------------- | ------------------------------------------------------ |
| `GET`    | `/produtos`       | Lista todos os produtos (com filtro opcional por nome) |
| `GET`    | `/produtos/count` | Retorna o total de produtos                            |
| `GET`    | `/produtos/:id`   | Busca produto por ID                                   |
| `POST`   | `/produtos`       | Cria novo produto                                      |
| `PATCH`  | `/produtos/:id`   | Atualiza produto existente                             |
| `DELETE` | `/produtos/:id`   | Remove produto                                         |

#### **Pedidos** (`/pedidos`)

| Método   | Endpoint         | Descrição                  |
| -------- | ---------------- | -------------------------- |
| `GET`    | `/pedidos`       | Lista todos os pedidos     |
| `GET`    | `/pedidos/count` | Retorna o total de pedidos |
| `GET`    | `/pedidos/:id`   | Busca pedido por ID        |
| `POST`   | `/pedidos`       | Cria novo pedido           |
| `DELETE` | `/pedidos/:id`   | Remove pedido              |

### 🔍 Exemplos de Uso

#### Buscar Clientes por Nome

```bash
GET /clientes?nome=João
```

#### Criar Novo Cliente

```bash
POST /clientes
Content-Type: application/json

{
  "nome": "João Silva",
  "email": "joao@email.com"
}
```

#### Buscar Produtos por Nome

```bash
GET /produtos?nome=Notebook
```

## 🛠️ Tecnologias Utilizadas

- **Runtime**: Node.js 22.18.0
- **Linguagem**: TypeScript
- **Framework**: Express.js 5.1.0
- **ORM**: Drizzle ORM
- **Banco de Dados**: PostgreSQL
- **Containerização**: Docker Compose
- **Gerenciador de Pacotes**: npm

## 🚀 Como Executar

### Pré-requisitos

- Node.js 22.18.0+
- Docker e Docker Compose
- npm 10.9.3+

### Instalação e Execução

1. **Clone o repositório**

```bash
git clone https://github.com/AyrlonDouglas/XPE-DESF5-Desafio-Final.git
cd XPE-DESF5-Desafio-Final
```

2. **Instale as dependências**

```bash
npm install
```

3. **Inicie o banco de dados**

```bash
docker-compose up -d
```

4. **Execute as migrações**

```bash
npm run db:migrate
```

5. **Inicie a aplicação**

```bash
npm run dev
```

A API estará disponível em `http://localhost:3000`

## 📝 Scripts Disponíveis

- `npm run dev`: Inicia o servidor em modo desenvolvimento
- `npm run build`: Compila o projeto TypeScript
- `npm run type-check`: Verifica tipos TypeScript
- `npm run db:generate`: Gera novas migrações
- `npm run db:migrate`: Executa migrações do banco

## 🏆 Diferenciais Implementados

1. **✅ Persistência de Dados**: Banco PostgreSQL com relacionamentos
2. **✅ Validações de Negócio**: Verificação de emails únicos, validações de dados
3. **✅ Relacionamentos**: Pedidos vinculados a clientes e produtos
4. **✅ TypeScript**: Tipagem estática para maior segurança
5. **✅ Docker**: Containerização para facilitar deploy
6. **✅ Migrações**: Controle de versão do banco de dados
7. **✅ Injeção de Dependência**: Arquitetura desacoplada e testável

## 📊 Modelo de Dados

### Tabelas do Banco

- **clientes**: id, nome, email, createdAt, updatedAt
- **produtos**: id, nome, preco, createdAt, updatedAt
- **pedidos**: id, clienteId, valor, createdAt, updatedAt
- **pedidos_produtos**: pedidoId, produtoId, createdAt, updatedAt

### Relacionamentos

- Um cliente pode ter múltiplos pedidos
- Um pedido pertence a um cliente
- Um pedido pode ter múltiplos produtos (tabela de relacionamento)
- Um produto pode estar em múltiplos pedidos

## 🎯 Conclusão

Este projeto atende completamente aos requisitos do desafio, implementando:

- ✅ API RESTful com arquitetura MVC
- ✅ Operações CRUD completas
- ✅ Endpoints de contagem e busca por nome
- ✅ Persistência de dados com PostgreSQL
- ✅ Documentação arquitetural com diagramas C4
- ✅ Código bem estruturado e organizado
- ✅ Separação clara de responsabilidades

A solução está pronta para ser utilizada por parceiros da empresa, fornecendo uma API robusta e escalável para gerenciamento de dados de vendas online.
