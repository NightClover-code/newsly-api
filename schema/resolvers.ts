//importing utils
import newsAPI from '../utils';

//resolvers
export const resolvers = {
  Query: {
    articles: async () => {
      const { data } = await newsAPI.get('/top-headlines', {
        params: {
          category: 'general',
          country: 'us',
          apiKey: process.env.API_KEY,
          pageSize: 11,
        },
      });
      return data.articles;
    },
  },
};
