//importing utils
import {
  newsAPI,
  cloudinaryURLs,
  getArticles,
  uploadToCloudinary,
  destroyFromCloudinary,
} from '../utils';
import { ArticleType } from '../interfaces';
import cloudinary from 'cloudinary';
import Article from '../models/article';

//resolvers
export const resolvers = {
  Query: {
    articles: async () => {
      // getting articles from db
      const savedArticles: ArticleType[] = await Article.find({});
      return savedArticles;
    },
    cloudinaryURLs: () => {
      //cloudinary saved images
      return cloudinaryURLs;
    },
  },
  Mutation: {
    saveAndUpdateArticles: async () => {
      try {
        //fetching raw articles
        const articles = await getArticles();

        const savedArticles: ArticleType[] = await Article.find({});
        //deleting old articles
        await Article.deleteMany({});

        //deleting old cloudinary images
        savedArticles.forEach(async ({ publicId }) => {
          if (publicId) {
            await destroyFromCloudinary(publicId);
          }
        });

        //articles with images
        const articlesWithImages = articles.filter(
          ({ urlToImage }: ArticleType) => urlToImage
        );

        //saving new articles
        const newSavedArticles = await Promise.all(
          articlesWithImages.map(async (article: ArticleType) => {
            const savedArticle = await Article.create(article);
            return savedArticle;
          })
        );

        const updatedArticles = Promise.all(
          newSavedArticles.map(async (article: any) => {
            const { urlToImage, _id } = article;

            const { url, public_id } = await uploadToCloudinary(urlToImage);

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
