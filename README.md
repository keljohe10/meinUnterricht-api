# Node.js API meinunterricht
## Stack

This section is going to show a curated list of the packages and tools used for this project (to see
the full list of dependencies take a look at `package.json`)

* [Koa](https://koajs.com/)
* [Koa Router](https://github.com/koajs/router)
* [Koa CORS](https://github.com/koajs/cors)
* [Koa Bodyparser](https://github.com/koajs/bodyparser)
* [Objection.js](https://vincit.github.io/objection.js/)
* [knex](http://knexjs.org/)
* [Jest](https://jestjs.io/)
* [PostgreSQL](https://www.postgresql.org/)
* [Docker](https://www.docker.com/)
* [Docker Compose](https://docs.docker.com/compose/)
* [Git](https://git-scm.com/)

# Start project

In order to start the project with docker you just need to execute the following script (you should
have docker already installed and working on your machine)

```
./bin/start
```

The script assumes that you have a `.env.sample` file that file is going to be copied to a file
with the name `.env` and it's going to be used to start the application


## Usage

### Migrate and seed database

You need to enter to the terminal (inside the
container), to do that just type the following command on your shell:

```
$ ./bin/terminal
```

Once you are there you can use the following commands to either migrate or seed the database.
In order to have the latest schema on your database you need to run the following command:

```
$ npx knex migrate:latest
```

Then to create some seed data for development the following command could be run:

```
$ npx knex seed:run
```

### Running tests

You need to enter to the terminal (inside the
container), to do that just type the following command on your shell:

```
$ ./bin/terminal
```

Once you are there, you can use the following commands to run tests:

```
$ yarn run test
```
