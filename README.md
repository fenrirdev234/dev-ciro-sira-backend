# dev-ciro-sira-backend

## Requirements

- Node: v20.16.0
- Npm: v10.8.1
- Docker: v27.2.0,

## Installation / How to run

So to install it you just need to clone the repository and run the following command:

Install dependencies

```bash
npm install
```

Create a database in local in development, run the following command:

```bash
npm run services
```

To run the samples in development mode, run the following command:

```bash
npm run dev
```

To run the samples in production mode, first build the samples using the following command:

```bash
npm run build
```

Then, run the following command to serve the samples:

```bash
npm run start
```

## Environment Variables

The environment variables are located in the `.env` file. The following environment variables are required:

- `PORT`: the porwhen run the app
- `NODE_ENV`: types of Development Environment (production, test, development)
- `MONGO_USER`: Mongo Atlsas user
- `MONGO_PASSWORD`: Mongo Atlas password
- `MONGO_HOSTNAME`: Mongo Atlas hostname
- `MONGO_NAMEAPP`: Mongo Atlas name app
- `MONGO_DATABASE`: Mongo database
- `MONGO_DATABASE_TEST`: Mongo testing database

## Project Structure

```bash
dev-ciro-sira-backend/
└──  src/
  ├── config/
  ├── controllers/
  ├── database/
  ├── middlewares/
  ├── models/
  ├── shemas/
  ├── services/
  ├── test/
  ├── utils/
  ├── V1/routes/
  ├── uploads
  ├── app.ts
  └── index.ts
```

## Deployment

- Backend host host:render [here](https://render.com/).
- Database host: MongoAtlas [here](https://www.mongodb.com/).

## Stack, Libraries, and Tools

This project uses the following stack:

- Library: [React](https://reactjs.org/)
- Framework: [Express.js](expressjs.com)
- Database: [Mongodb](expressjs.com)
- ODM: [Mongoose](expressjs.com)
- Language: [TypeScript](https://www.typescriptlang.org/)
- Linting: [ESLint](https://eslint.org/)
- Version Control: [Git](https://git-scm.com/)
- Repository Hosting: [GitHub](https://github.com/)

## License

This project is open source and available under the [MIT License](LICENSE).
