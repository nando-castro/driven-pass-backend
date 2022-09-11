# Driven Pass

A password manager.


## Features

- Signup and signin
- Different types of records (credentials, notes, cards, wifi networks)
- Creation, search and selection
- Data encryption


## Demonstração

Insira um gif ou um link de alguma demonstração


## Environment Variables

To run this project, you will need to add the following environment variables to your .env

`PORT=<PORT>`
`DATABASE_URL=<DATABASE://USER_NAME:PASSWORD@HOST:PORTHOST/DATABASE_NAME>`
`SECRET_KEY=<STRING>`
`JWT_SECRETKEY=<STRING>`
`MODE=<PROD | DEV>`

## API Documentation

#### Retorna todos os itens

```http
  GET /api/items
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `api_key` | `string` | **Obrigatório**. A chave da sua API |

#### Retorna um item

```http
  GET /api/items/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do item que você quer |

#### add(num1, num2)

Recebe dois números e retorna a sua soma.


## Rodando localmente

Clone the project

```bash
  git clone https://link-para-o-projeto
```

Entre no diretório do projeto

```bash
  cd my-project
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm run start
```


## Autores

- [@octokatherine](https://www.github.com/octokatherine)
