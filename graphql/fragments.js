//importing gql
import { gql } from 'apollo-server-express';

//fragments
export const articleDetailFragment = gql`
  fragment ArticleDetail on Article {
    author
    title
    description
    urlToImage
    publishedAt
    content
  }
`;
