//importing gql
import { gql } from 'apollo-server-express';

//type defs
export const typeDefs = gql`
  # query
  type Query {
    hello: String
  }
`;
