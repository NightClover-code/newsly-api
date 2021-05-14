//importing gql
import { gql } from 'apollo-server-express';

//type defs
export const typeDefs = gql`
  # query
  type Query {
    articles: [Article]
  }

  # types
  type Source {
    id: String
    name: String
  }

  type Article {
    id: ID!
    source: Source
    author: String
    title: String
    description: String
    url: String
    image: Image
    publishedAt: String
    content: String
  }

  type Image {
    id: ID
    urlToImage: String
  }
`;
