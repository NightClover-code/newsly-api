//importing utils
import newsAPI from '../utils';

//resolvers
export const resolvers = {
  Query: {
    articles: async () => {
      const { data } = await newsAPI.get('/everything', {
        params: {
          domains: 'cnbc.com',
          apiKey: process.env.API_KEY,
          pageSize: 9,
        },
      });
      return data.articles;
    },
    article: async () => {
      const { data } = await newsAPI.get('/top-headlines', {
        params: {
          country: 'us',
          apiKey: process.env.API_KEY,
        },
      });
      return data.articles[0];
    },
  },
};
