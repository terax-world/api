# TeraxWorld API Documentation

## Introduction

Welcome to the TeraxWorld API documentation. This API provides endpoints for managing products, categories, servers, and invoices. It is built using NestJS and Prisma, ensuring a robust and scalable architecture.

## Table of Contents

1. [Getting Started](#getting-started)
2. [API Endpoints](#api-endpoints)
3. [Database Models](#database-models)
4. [Configuration](#configuration)
5. [Technologies](#technologies)
6. [Development](#development)
7. [Contributing](#contributing)
8. [License](#license)

## Getting Started

To get started with the TeraxWorld API, follow these steps:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/teraxworld-api.git
   cd teraxworld-api
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables:**
   Create a `.env` file in the root directory and add the following:
   ```
   DATABASE_URL="your-database-url"
   ```

4. **Run the API:**
   ```bash
   npm run start:dev
   ```

## API Endpoints

The API provides endpoints:

### Products

- **GET /products**: Retrieves all products.
- **GET /products/:id**: Retrieves a product by ID.
- **POST /products**: Creates a new product.
- **DELETE /products/:id**: Deletes a product by ID.
- **PUT /products/:id**: Updates a product by ID.

### Categories

- **GET /categories**: Retrieves all categories.
- **GET /categories/:id**: Retrieves a category by ID.
- **POST /categories**: Creates a new category.
- **PUT /categories/:id**: Updates a category by ID.
- **DELETE /categories/:id**: Deletes a category by ID.

### Servers

- **GET /servers**: Retrieves all servers.
- **GET /servers/:id**: Retrieves a server by ID.
- **POST /servers**: Creates a new server.
- **DELETE /servers/:id**: Deletes a server by ID.
- **PUT /servers/:id**: Updates a server by ID.

### Invoices

- **POST /invoices**: Creates a new invoice.
- **GET /invoices**: Retrieves all invoices.
- **DELETE /invoices/:id**: Deletes an invoice by ID.

## Database Models

The database models are defined using Prisma. Here are the models:

### Product

- **id**: Unique identifier.
- **name**: Product name.
- **description**: Product description.
- **categories**: Associated categories.
- **servers**: Associated servers.
- **permissions**: Permissions for the product.
- **commands**: Commands associated with the product.
- **price**: Product price.
- **promoPrice**: Promotional price.
- **image**: Product image.
- **duration**: Duration of the product.
- **slug**: Unique slug for the product.
- **active**: Whether the product is active.
- **createdAt**: Timestamp for creation.
- **updatedAt**: Timestamp for last update.
- **categoryId**: Foreign key for category.
- **serverId**: Foreign key for server.

### Category

- **id**: Unique identifier.
- **name**: Category name.
- **description**: Category description.
- **image**: Category image.
- **createdAt**: Timestamp for creation.
- **updatedAt**: Timestamp for last update.
- **Product**: Associated products.

### Server

- **id**: Unique identifier.
- **name**: Server name.
- **description**: Server description.
- **image**: Server image.
- **createdAt**: Timestamp for creation.
- **updatedAt**: Timestamp for last update.
- **Product**: Associated products.

### Invoice

- **id**: Unique identifier.
- **productId**: Foreign key for product.
- **status**: Invoice status.
- **paymentMethod**: Payment method used.
- **amount**: Invoice amount.
- **nick**: Nickname associated with the invoice.
- **transactionId**: Transaction ID.
- **createdAt**: Timestamp for creation.
- **updatedAt**: Timestamp for last update.

## Configuration

The API is configured using the following files:

- **.env**: Environment variables.
- **prisma/schema.prisma**: Prisma schema for database models.
- **nest-cli.json**: NestJS CLI configuration.

## Technologies

The TeraxWorld API is built using the following technologies:

- **NestJS**: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- **Prisma**: A modern ORM for Node.js that connects to your database and allows you to perform CRUD operations.
- **TypeScript**: A superset of JavaScript that adds static types.
- **Express**: A web application framework for Node.js.
- **PostgreSQL**: A powerful, open-source object-relational database system.
- **Docker**: A platform for developing, shipping, and running applications in containers.
- **Webpack**: A module bundler for JavaScript applications.
- **Jest**: A testing framework for JavaScript.
- **ESLint**: A linter for identifying and reporting on patterns in JavaScript.
- **Prettier**: An opinionated code formatter.

## Development

To develop the API, follow these steps:

1. **Run the API in Development Mode:**
   ```bash
   npm run start:dev
   ```

2. **Run Tests:**
   ```bash
   npm run test
   ```

3. **Lint the Code:**
   ```bash
   npm run lint
   ```

4. **Format the Code:**
   ```bash
   npm run format
   ```

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the Repository:**
   ```bash
   git fork https://github.com/your-username/teraxworld-api.git
   ```

2. **Create a New Branch:**
   ```bash
   git checkout -b new-feature
   ```

3. **Make Changes and Commit:**
   ```bash
   git add .
   git commit -m "Add new feature"
   ```

4. **Push Changes:**
   ```bash
   git push origin new-feature
   ```

5. **Create a Pull Request:**
   Go to the repository and create a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.