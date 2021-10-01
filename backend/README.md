# NodeJS REST API

## Features

- Authentication
- Authorization
- Account Email verification

## Tech stack

- Nodejs
- Express
- Sequelize ORM
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

   ```bash
   NODE_ENV=development
   PORT=8000

   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASS=
   DB_NAME=mern

   SENDGRID_API_KEY=SG.XXX
   ```

3. Running the app locally

   Run this command, which is located in npm script in `package.json` file.

   ```bash
   npm run dev
   ```

4. Demo data  
   Role

   ```
   admin
   vendor
   customer
   ```

   User

   ```
   username: admin
   email: admin@admin.com
   password: password


   ```
