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
    uploadPhoto: async (_: any, { photo }: any) => {
      //initialize cloudinary
      cloudinary.v2.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });
      //returning new cloudinary photo url
      try {
        const { url } = await cloudinary.v2.uploader.upload(photo);
        return url;
      } catch (err) {
        return `Image could not be uploaded: ${err.message}`;
      }
    },
  },
};
