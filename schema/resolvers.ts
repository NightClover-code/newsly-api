//importing utils
import newsAPI from '../utils';
import cloudinary from 'cloudinary';

//resolvers
export const resolvers = {
  Query: {
    articles: async () => {
      const { data } = await newsAPI.get('/top-headlines', {
        params: {
          category: 'general',
          country: 'us',
          apiKey: process.env.NEWS_API_KEY,
          pageSize: 11,
        },
      });
      return data.articles;
    },
  },
  Mutation: {
    uploadArticles: async (_: any, { input: { articles, photo } }: any) => {
      //initialize cloudinary
      cloudinary.v2.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });
      //returning new articles with cloudinary uploaded photos
      try {
        const { url } = await cloudinary.v2.uploader.upload(photo);
        return articles.map((article: any) => ({
          ...article, 
          urlToImage: url,
        }))
      } catch (err) {
        return articles.map((article: any) => ({
          ...article,
          urlToImage: `Image could not be uploaded: ${err.message}`,
        }));
      }
    },
  },
};
