//importing dependencies
import express from 'express';
import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
//importing graphql schema
import { typeDefs } from './schema/typeDefs';
import { resolvers } from './schema/resolvers';
//importing utils
import newsAPI from './utils';
import { v4 as uuidv4 } from 'uuid';

//env init
const PORT = process.env.PORT;
const password = process.env.MONGO_DB_PASSWORD;
const dbName = process.env.MONGO_DB_DATABASE_NAME;

//init app
const app = express();
dotenv.config();

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

//routes
app.get('/articles', async (req, res) => {
  try {
    // fetching raw articles
    const { data } = await newsAPI.get('/top-headlines', {
      params: {
        category: 'general',
        country: 'us',
        apiKey: process.env.NEWS_API_KEY,
        pageSize: 11,
      },
    });

    const newArticles = data.articles.map((article: any) => ({
      id: uuidv4(),
      ...article,
    }));

    res.send(newArticles);
  } catch (err) {
    throw err;
  }
});

//middlewares
server.applyMiddleware({ app });
