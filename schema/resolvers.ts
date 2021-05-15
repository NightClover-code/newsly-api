//importing utils
import newsAPI from '../utils';
import cloudinary from 'cloudinary';
import Article from '../models/article';

//resolvers
export const resolvers = {
  Query: {
    articles: async () => {
      //getting articles from db
      const savedArticles = await Article.find({});
      return savedArticles;
    },
  },
  Mutation: {
    saveArticles: async () => {
      //fetching raw articles
      const {
        data: { articles },
      } = await newsAPI.get('/top-headlines', {
        params: {
          category: 'general',
          country: 'us',
          apiKey: process.env.NEWS_API_KEY,
          pageSize: 11,
        },
      });

      const savedArticles = await Article.find({});
      //deleting old articles
      await Article.deleteMany({});

      //saving new articles
      articles.forEach(async (article: any) => {
        await Article.create(article);
      });
      return savedArticles;
    },
    updateArticles: async () => {
      //getting articles from db
      const savedArticles = await Article.find({});

      //initialize cloudinary
      cloudinary.v2.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });

      //updating articles to use cloudinary images
      savedArticles.forEach(async (article: any) => {
        const { urlToImage, publicId, _id } = article;

        if (publicId === null) {
          try {
            const { url, public_id } = await cloudinary.v2.uploader.upload(
              urlToImage
            );
            await Article.updateOne(
              {
                _id,
              },
              {
                publicId: public_id,
                urlToImage: url,
              }
            );
          } catch (err) {
            throw err;
          }
        }

        return article;
      });
      return savedArticles;
    },
  },
};
