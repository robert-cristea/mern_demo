# NodeJS REST API

## Features

- Authentication
- Authorization
- Email verification

## Tech stack

- Nodejs
- Express
- Sequelize
- MySQL

## Getting Started

1. Install the npm packages

   ```bash
   npm install
   ```

   Also install `nodemon` globally, if you don't have it yet.

   ```bash
   npm install -g nodemon
   ```

2. Congfigure environment settings

   Create a file with the following name and location `.env` and copy the contents from `.env.example` into it. Replace the values with your specific configuration. Don't worry, this file is in the `.gitignore` so it won't get pushed to github.

   ```javasscript
    NODE_ENV=development
    PORT=8080

    # Database
    DB_HOST=your-db-host
    DB_USER=your-db-username
    DB_PASS=your-db-password
    DB_NAME=your-db-name
   ```

3. Running the app locally

   Run this command, which is located in npm script in `package.json` file.

   ```bash
   npm run dev
   ```
