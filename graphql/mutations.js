//importing gql
import { gql } from 'apollo-server-express';
import { articleDetailFragment } from './fragments';

export const updateArticlesMutation = gql`
  mutation {
    updateArticles {
      ...ArticleDetail
    }
  }
  ${articleDetailFragment}
`;

export const saveArticlesMutation = gql`
  mutation {
    saveArticles {
      ...ArticleDetail
    }
  }
  ${articleDetailFragment}
`;
