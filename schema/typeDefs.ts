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
    _id: ID!
    publicId: ID
    source: Source
    author: String
    title: String
    description: String
    url: String
    urlToImage: String
    publishedAt: String
    content: String
  }

  # Mutations
  type Mutation {
    getUpdatedArticles: [Article!]!
  }
`;
