//importing gql
import { gql } from 'graphql-request';

//mutations
export const saveAndUpdateArticlesMutation = gql`
  mutation SaveAndUpdateArticles {
    articles: saveAndUpdateArticles {
      author
      title
      description
      urlToImage
      publishedAt
      content
    }
  }
`;
