# API Terax World

[![NestJS](https://img.shields.io/badge/NestJS-11.0.1-%23E02340)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-%23007ACC)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.11.1-%23DE5E2C)](https://prisma.io/)
[![License: MIT](https://img.shields.io/badge/license-MIT-black)](LICENSE)

Um projeto API construído com NestJS, um framework progressive para construir APIs com Node.js, e Prisma como ORM.

## Sumário

- [Sobre](#sobre)
- [Tecnologias](#tecnologias)
- [Começando](#começando)
- [Uso](#uso)
  - [Endpoints](#endpoints)
- [Versões](#versões)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Sobre

Este é um projeto de API desenvolvido com NestJS e Prisma. O objetivo é fornecer uma estrutura robusta e escalável para APIs.

## Tecnologias

- **NestJS**: Framework progressive para construir APIs com Node.js.
- **Prisma**: Um ORM moderno para Node.js e TypeScript.
- **TypeScript**: Uma superset do JavaScript que adiciona tipos.
- **Jest**: Um framework de testes.
- **Webpack**: Um empacotador de módulos JavaScript.

## Começando

Para começar a usar este projeto, siga estas etapas:

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   ```
2. Navegue até o diretório do projeto:
   ```bash
   cd seu-repositorio
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run start:dev
   ```

## Uso

Para usar a API, siga estas etapas:

1. Faça uma solicitação HTTP para o endpoint desejado.
2. Use os métodos HTTP apropriados (GET, POST, PUT, DELETE, etc.).

### Endpoints

| Endpoint          | Method | Descrição                                      |
|-------------------|--------|------------------------------------------------|
| /categories       | GET    | Listar todas as categorias                      |
| /categories       | POST   | Criar uma nova categoria                        |
| /categories/:id   | GET    | Obter uma categoria pelo ID                     |
| /categories/:id   | PUT    | Atualizar uma categoria pelo ID                 |
| /categories/:id   | DELETE | Excluir uma categoria pelo ID                   |
| /products         | GET    | Listar todos os produtos                        |
| /products/:id     | GET    | Obter um produto pelo ID                        |
| /servers          | GET    | Listar todos os servidores                      |
| /servers/:id      | GET    | Obter um servidor pelo ID                       |
| /servers/:id      | POST   | Criar um novo servidor                          |
| /servers/:id      | PUT    | Atualizar um servidor pelo ID                   |
| /servers/:id      | DELETE | Excluir um servidor pelo ID                     |

## Versões

| Versão | Data       | Descrição                             |
|--------|------------|---------------------------------------|
| 1.0.0  | 2024-07-11 | Lançamento inicial                     |
| 1.1.0  | 2024-08-01 | Adição de endpoints para servidores    |
| 1.2.0  | 2024-09-15 | Melhorias na performance e estabilidade|

## Contribuição

Para contribuir com este projeto, siga estas etapas:

1. Faça um fork do repositório.
2. Crie uma nova branch com sua feature ou correção:
   ```bash
   git checkout -b minha-feature
   ```
3. Faça suas alterações e commit.
4. Envie um pull request.

## Licença

Este projeto está sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.

---