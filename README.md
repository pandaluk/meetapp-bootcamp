<h1 align="center">
    <img alt="Icons made by Freepik" src="https://image.flaticon.com/icons/svg/725/725329.svg" height="124" width="124">
    <br>
    Meetapp API
</h1>

This is an API created with NodeJS during [Rocketseat Bootcamp](https://rocketseat.com.br/bootcamp) in order to allow users to create and register for meetups. For the owner it is possible to see a list with all his schedule and receive notifications by email when a new user register for his event.

## :rocket: Installation

Clone the repository

```bash
git clone https://github.com/giovanniantonaccio/gobarber
```

Install the following docker containers:

```bash
docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
docker run --name mongodb -p 27017:27017 -d -t mongo
docker run --name redis -p 6379:6379 -d -t redis:alpine
```

Rename `.env.example` to `.env` and fill the informations.

Install the dependencies:

```bash
yarn
```

Run the following commands to run the server:

```bash
yarn dev
```

Open a new terminal and run the following command to run the queue manager:

```bash
yarn queue
```

## :books: Technologies

This project was developed with the following technologies:

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [nodemon](https://nodemon.io/)
- [Sucrase](https://github.com/alangpierce/sucrase)
- [Docker](https://www.docker.com/docker-community)
- [Sequelize](http://docs.sequelizejs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [node-postgres](https://www.npmjs.com/package/pg)
- [Redis](https://redis.io/)
- [JWT](https://jwt.io/)
- [Multer](https://github.com/expressjs/multer)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [Youch](https://www.npmjs.com/package/youch)
- [Yup](https://www.npmjs.com/package/yup)
- [Bee Queue](https://www.npmjs.com/package/bcrypt)
- [Nodemailer](https://nodemailer.com/about/)
- [date-fns](https://date-fns.org/)
- [Sentry](https://sentry.io/)
- [DotEnv](https://www.npmjs.com/package/dotenv)
- [VS Code](https://code.visualstudio.com/) with [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

---

Arthur Santos :wave: [Get in touch!](https://www.linkedin.com/in/arthursilva92/)

README.md made by Giovanni Antonaccio [Get in touch!](https://www.linkedin.com/in/giovanniantonaccio/)
