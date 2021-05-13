//importing gql
import { gql } from 'apollo-server-express';

//type defs
export const typeDefs = gql`
  # query
  type Query {
    articles: [Article]
    article: Article
  }

  # types
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

  # Mutations
  type Mutation {
    updateArticles(articles: [ArticleInput!]!): [Article]
  }

  # inputs
  input SourceInput {
    id: String
    name: String
  }

  input ArticleInput {
    source: SourceInput
    author: String
    title: String
    description: String
    url: String
    urlToImage: String
    publishedAt: String
    content: String
  }
`;
