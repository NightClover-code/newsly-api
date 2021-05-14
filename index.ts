//importing dependencies
import express from 'express';
import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
//importing graphql schema
import { typeDefs } from './schema/typeDefs';
import { resolvers } from './schema/resolvers';

//init app
const app = express();
dotenv.config();

//env init
const PORT = process.env.PORT;
const password = process.env.MONGO_DB_PASSWORD;
const dbName = process.env.MONGO_DB_DATABASE_NAME;

//init server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

//connection to mongodb
const dbURI = `mongodb+srv://achraf:${password}@newslydb.xihcp.mongodb.net/${dbName}?retryWrites=true&w=majority`;
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT || '4000', () => {
      console.log(
        `Server running on port ${PORT}`,
        `visit http://localhost:${PORT}/graphql`
      );
    });
  });

//middlewares
server.applyMiddleware({ app });
