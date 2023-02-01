<h1 align="center">A simplified Tori.fi clone built with Nextjs and ExpressJs</h1>

<div align="center">Auto formatted with Prettier 🎗</div>

## Setting up development environment 🛠
- Install [postgreSQL](https://www.postgresql.org/) if you don't have it already.
- `git clone https://github.com/attroid/vuokraus.git`
- Create an empty `.env` file, copy `.env.tmpl` contents into it, and fill in your database credentials and settings
- `npm run install`
- Create database, run migrations and seeds by running `npm run db:create && knex migrate:latest && knex seed:run`
- `npm run dev`
- App should now be running on `http://localhost:{PORT defined in .env}/`

## Creating production build 🛠
- `npm run build`
- `npm start`