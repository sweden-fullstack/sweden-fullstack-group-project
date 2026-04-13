# Backend

## Features

### [Express](https://expressjs.com/en/starter/examples.html)

- Web framework

### [Mysql2](https://sidorares.github.io/node-mysql2/docs)

- Mysql adapter

### [Typia](https://typia.io/docs/)

- Used for validating that the received json is valid and doesn't contain any
  unnecessary fields which then allows most queries to be done with just passing
  the parsed object instead of manually settings each field

### [Umzug](https://github.com/sequelize/umzug)

- Used for database migrations, uses custom adapter to make it work like flyway

## How to use?

```
src
|
+-- config       # global configurations, exported env variables etc.
|
+-- lib          # reusable libraries preconfigured for the application
|
+-- middlewares  # middlewares such as auth and error global error handlers
|
+-- migrations   # database migrations, read the [README.md](./src/migrations/README.md)
|
+-- modules      # modules containing different features such as user
|
+-- types        # shared types used across the whole project
|
+-- utils        # shared utility functions
|
+-- index.ts     # entry point for the app
```

```
src/modules/user
|
+-- types                # types scoped to the specific feature
|   |
|   +-- user.entity.ts   # user as it is represented in the database,
|                        # not to be sent as is to the frontend
|
+-- user.controller.ts   # handles what is sent to the frontend and calls the service
|                        # as well as error handling
|
+-- user.repository.ts   # Interacting with the database
|
+-- user.routes.ts       # Contains the routes and which controller they call
|
+-- user.service.ts      # gets data from repository and returns it as DTO objects
```

[Shared README](../shared/README.md)
[Migrations README](./src/migrations/README.md)
