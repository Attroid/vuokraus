# Project structure 🏗

The codebase is fairly simple and should be easy enough to understand.

<br>

| File or folder      | Description                                                                                                                                                                                                                 |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/index.js`      | The entry file. This is where we setup middleware, attach routes, and initialize express.                                                                                                                                   |
| `src/api`           | This is where we define all routes, both public and private.                                                                                                                                                                |
| `src/components`    | This is where all react components are stored                                                                                                                                                                               |
| `src/database`      | Database related code, migrations and seeds go here.                                                                                                                                                                        |
| `src/handlers`      | This is where we put database models and created handlers which use those models                                                                                                                                            |
| `src/localizations` | Localization related code and translation.json files                                                                                                                                                                        |
| `src/middleware`    | Middleware functions can modify request and response objects, end the request-response cycle, etc.                                                                                                                          |
| `src/pages`         | NextJs pages folder                                                                                                                                                                                                         |
| `src/styles`        | Global css styles for website                                                                                                                                                                                               |
| `src/utils`         | Custom errors, helper functions, password hashing etc. go here                                                                                                                                                              |