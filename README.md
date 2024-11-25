# Node v22.11.0

# create your own postgres database connection for Mac:
```bash
brew install postgresql

brew services start postgresql

psql postgres
CREATE USER postgres WITH PASSWORD 'postgres';
CREATE DATABASE cypra OWNER postgres;
\q

```

# setup project
```bash
cp .env.example .env

npm run dev

npm run down-migrate

npm run migrate-and-seed
```

# test account

```bash
admin@gmail.com / 12345
```