//importing gql
import { gql } from 'apollo-server-express';

//type defs
export const typeDefs = gql`
  # query
  type Query {
    articles: [Article]
    cloudinaryURLs: CloudinaryURLs
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

  type CloudinaryURLs {
    avatar: String
    heroShape: String
    heroTriangles: String
    iconArrow: String
    iconDot: String
    iconFacebook: String
    logo: String
    iconLinkedIn: String
    iconQuotes: String
    iconSearch: String
    iconTwitter: String
    logoBusiness: String
    logoFooter: String
    logoEntertainement: String
    logoGeneral: String
    logoHealth: String
    logoScience: String
    logoSports: String
    logoTechnology: String
  }

  # Mutations
  type Mutation {
    saveAndUpdateArticles: [Article!]!
  }
`;
