//importing dependencies
import express from 'express';
import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import cloudinary from 'cloudinary';

//importing graphql utils
import { typeDefs } from './schema/typeDefs';
import { resolvers } from './schema/resolvers';
import { saveAndUpdateArticles } from './utils';

//init app
const app = express();
dotenv.config();

//env init
const PORT = process.env.PORT;
const password = process.env.MONGO_DB_PASSWORD;
const dbName = process.env.MONGO_DB_DATABASE_NAME;

//initialize cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//init server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

//connection to mongodb
const dbURI = `mongodb+srv://achraf:${password}@newslydb.xihcp.mongodb.net/${dbName}?retryWrites=true&w=majority`;
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false,
  })
  .then(() => {
    app.listen(PORT || '4000', async () => {
      const delay = 1800000;
      //updating server every 15min
      const callback = async () => {
        await saveAndUpdateArticles();
        setTimeout(callback, delay);
      };
      setTimeout(callback, delay);

      console.log(
        `Server running on port ${PORT}`,
        `visit http://localhost:${PORT}/graphql`
      );
    });
  });

//middlewares
server.applyMiddleware({ app });
