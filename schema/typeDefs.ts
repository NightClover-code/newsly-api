//importing gql
import { gql } from 'apollo-server-express';

//type defs
export const typeDefs = gql`
  # query
  type Query {
    hello: String
  }

  # types
  type Response {
    status: String
    totalResults: Int
    articles: [Article]
  }

  type Source {
    id: String
    name: String
  }

  type Article {
    source: Source
    author: String
    title: String
    description: String
    url: String
    urlToImage: String
    publishedAt: String
    content: String
  }
`;
