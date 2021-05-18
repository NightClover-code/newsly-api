//importing utils
import newsAPI from '../utils';
import cloudinary from 'cloudinary';
import Article from '../models/article';
import { ArticleType } from '../interfaces';

//resolvers
export const resolvers = {
  Query: {
    articles: async () => {
      //getting articles from db
      const savedArticles: ArticleType[] = await Article.find({});
      return savedArticles;
    },
  },
  Mutation: {
    saveArticles: async () => {
      try {
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

        const savedArticles: ArticleType[] = await Article.find({});
        //deleting old articles
        await Article.deleteMany({});

        //deleting old cloudinary images
        savedArticles.forEach(async ({ publicId }) => {
          if (publicId) {
            await cloudinary.v2.uploader.destroy(publicId);
          }
        });

        //saving new articles
        articles.forEach(async (article: ArticleType) => {
          if (article.urlToImage) {
            await Article.create(article);
          }
        });
        return savedArticles;
      } catch (err) {
        console.log(err);
      }
    },
    updateArticles: async () => {
      try {
        //getting articles from db
        const savedArticles: ArticleType[] = await Article.find({});

        //updating articles to use cloudinary images
        savedArticles.forEach(async article => {
          const { urlToImage, publicId, _id } = article;

          if (publicId === null) {
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
          }
        });

        return savedArticles;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
