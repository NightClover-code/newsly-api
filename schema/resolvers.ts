//importing utils
import newsAPI from '../utils';
import cloudinary from 'cloudinary';
import Article from '../models/article';

//resolvers
export const resolvers = {
  Query: {
    articles: async () => {
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

      //saving articles with different contents
      const savedArticles = await Article.find({});

      articles.map(async (article: any, index: number) => {
        if (article.content !== savedArticles[index].content) {
          await Article.create(article);
        }
      });

      return savedArticles;
    },
  },
  Mutation: {
    getUpdatedArticles: async () => {
      //getting saved articles
      const savedArticles = await Article.find({});

      //initialize cloudinary
      cloudinary.v2.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });

      //updating articles to use cloudinary images
      savedArticles.map(async (article: any) => {
        try {
          const { urlToImage, publicId, _id } = article;

          const { url, public_id } = await cloudinary.v2.uploader.upload(
            urlToImage,
            {
              public_id: publicId,
            }
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
          return article;
        } catch (err) {
          throw err;
        }
      });

      return savedArticles;
    },
  },
};
