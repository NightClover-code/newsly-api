//importing dependencies
import express from 'express';
import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server-express';
//importing graphql schema
import { typeDefs } from './schema/typeDefs';
import { resolvers } from './schema/resolvers';
//init app
const app = express();
dotenv.config();

//init server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

//middlewares
server.applyMiddleware({ app });

//listenning
const PORT = process.env.PORT;
app.listen(PORT || '4000', () => {
  console.log(
    `Server running on port ${PORT}`,
    `visit http://localhost:${PORT}/graphql`
  );
});
