# Driven Pass

A password manager.


## Features

- Signup and signin
- Different types of records (credentials, notes, cards, wifi networks)
- Creation, search and selection
- Data encryption


## Demonstration

Insira um gif ou um link de alguma demonstração


## Environment Variables

To run this project, you will need to add the following environment variables to your .env

`PORT=<PORT>`
`DATABASE_URL=<DATABASE://USER_NAME:PASSWORD@HOST:PORTHOST/DATABASE_NAME>`
`SECRET_KEY=<STRING>`
`JWT_SECRETKEY=<STRING>`
`MODE=<PROD | DEV>`

## API Documentation

### Returns all credentials

```http
  GET /api/credenials
```

| Parameter   | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `Authorization` | `string` | **Required**. A token generated at sign in |

```json
{
 "credentials": [
 {
  "title": "title",
  "url": "url",
  "userName": "user name",
  "password": "password"
 },
 {
  "title": "title2",
  "url": "url2",
  "userName": "user name2",
  "password": "password2"
 }
 ]
}
```

### Returns a credential

##### Required

```http
  GET /api/credential/${id}
```

| Parameter   | Type       | Description                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Required**. The ID of the item you want |

#### Response

```json
{
  "title": "title",
  "url": "url",
  "userName": "user name",
  "password": "password"
}
```

## Running Locally

Clone the project

```bash
  git clone https://github.com/nando-castro/driven-pass-backend.git
```

Enter the project directory

```bash
  cd my-project
```

Install the dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## Authors

- [@nando-castro](https://www.github.com/nando-castro)
