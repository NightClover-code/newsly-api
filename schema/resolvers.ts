//importing utils
import newsAPI from '../utils';
import cloudinary from 'cloudinary';
import Article from '../models/article';
import { ArticleType } from '../interfaces';

//resolvers
export const resolvers = {
  Query: {
    articles: async () => {
      // getting articles from db
      const savedArticles: ArticleType[] = await Article.find({});
      return savedArticles;
    },
  },
  Mutation: {
    saveAndUpdateArticles: async () => {
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
        const newSavedArticles = await Promise.all(
          articles.map(async (article: ArticleType) => {
            if (article.urlToImage) {
              const savedArticle = await Article.create(article);
              return savedArticle;
            }
          })
        );

        const updatedArticles = Promise.all(
          newSavedArticles.map(async (article: any) => {
            const { urlToImage, _id } = article;

            const { url, public_id } = await cloudinary.v2.uploader.upload(
              urlToImage
            );
            const updatedArticle = await Article.findByIdAndUpdate(
              _id,
              {
                publicId: public_id,
                urlToImage: url,
              },
              { lean: true, new: true }
            );

            return updatedArticle;
          })
        );

        return updatedArticles;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
