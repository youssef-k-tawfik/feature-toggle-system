# Feature Toggle System

A feature toggle system allows developers to enable or disable features in a software application without deploying new code. This helps in testing new features, rolling out updates gradually, and managing feature releases efficiently.

**LIVE DEMO** 👉 https://feature-toggle-system.vercel.app/

## Using the `mockStore` File for Tests

The `mockStore` file is used to create a mock version of the Redux store for testing purposes. This allows you to simulate different states and actions without relying on the actual store implementation.

## Cloning the Repository

To clone this repository, run the following command:

```bash
git clone https://github.com/youssef-k-tawfik/feature-toggle-system.git
```

Navigate to the project directory:

```bash
cd feature-toggle-system
```

## Installing Packages

Install the necessary packages using npm:

```bash
npm install
```

## Setting Up Environment Variables for Prisma

Create a `.env` file in the root directory of your project and add the following environment variables:

```
DATABASE_URL="<DBdriver>://<user>:<password>@<domain>:<port>/<DBname>"
```

- `<DBdriver>`: The database driver you are using (e.g., `postgresql`, `mysql`).
- `<user>`: The username for your database.
- `<password>`: The password for your database user.
- `<domain>`: The domain where your database is hosted (e.g., `localhost`).
- `<port>`: The port number your database is listening on (e.g., `3306`).
- `<DBname>`: The name of your database.

Replace these placeholders with your actual database credentials.
Prisma will use this environment variable to connect to your database.

## Running Prisma Migrations

Run the Prisma migrations to ensure your database schema is up to date:

```bash
npx prisma migrate dev
```

This will allow you to interact with your Prisma client and perform any necessary operations on your database.

## Execute the Initial Prisma Script

Execute the following script only once to set up the initial data:

```bash
npx ts-node -P tsconfig.script.json prisma/seed.ts
```

## Running the Development Server

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Enjoy!
