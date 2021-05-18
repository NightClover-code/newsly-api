//importing utils
import { GraphQLDataSource } from 'apollo-datasource-graphql';
import { updateArticlesMutation, saveArticlesMutation } from './mutations';

export class ArticlesGraphQLAPI extends GraphQLDataSource {
  baseURL = 'http://localhost:4000/graphql';

  async saveArticles() {
    try {
      await this.mutation(saveArticlesMutation);
    } catch (error) {
      console.error(error);
    }
  }

  async updateArticles() {
    try {
      await this.mutation(updateArticlesMutation);
    } catch (error) {
      console.error(error);
    }
  }
}
