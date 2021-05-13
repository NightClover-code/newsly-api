//importing utils
import newsAPI from '../utils';
import cloudinary from 'cloudinary';

//resolvers
export const resolvers = {
  Query: {
    articles: async () => {
      //fetching raw articles
      const { data } = await newsAPI.get('/top-headlines', {
        params: {
          category: 'general',
          country: 'us',
          apiKey: process.env.NEWS_API_KEY,
          pageSize: 11,
        },
      });
      //initialize cloudinary
      cloudinary.v2.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });
      //articles with cloudinary url
      return data.articles.map(async (article: any) => {
        //destructuring
        const { urlToImage } = article;
        //returning new articles with cloudinary uploaded photos
        try {
          const { url } = await cloudinary.v2.uploader.upload(urlToImage);
          return {
            ...article,
            urlToImage: url,
          };
        } catch (err) {
          return {
            ...article,
            urlToImage: `Image could not be uploaded: ${err.message}`,
          };
        }
      });
    },
  },
};
