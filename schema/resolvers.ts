//importing utils
import {
  cloudinaryURLs,
  getArticles,
  uploadToCloudinary,
  destroyFromCloudinary,
  getArticlesDB,
  deleteArticlesDB,
  createArticleDB,
  updateArticleDB,
} from '../utils';

//resolvers
export const resolvers = {
  Query: {
    articles: async () => {
      // getting articles from db
      const savedArticles = await getArticlesDB();
      return savedArticles;
    },
    cloudinaryURLs: () => {
      //cloudinary saved images
      return cloudinaryURLs;
    },
  },
  Mutation: {
    saveAndUpdateArticles: async () => {
      //fetching raw articles
      const articles = await getArticles();

      const savedArticles = await getArticlesDB();
      //deleting old articles
      await deleteArticlesDB();

      //deleting old cloudinary images
      savedArticles?.forEach(async ({ publicId }) => {
        if (publicId) {
          await destroyFromCloudinary(publicId);
        }
      });

      //articles with images
      const articlesWithImages = articles.filter(
        ({ urlToImage }) => urlToImage
      );

      //saving new articles
      const newSavedArticles = await Promise.all(
        articlesWithImages.map(async article => {
          const savedArticle = await createArticleDB(article);
          return savedArticle;
        })
      );

      //getting new updated articles
      const updatedArticles = await Promise.all(
        newSavedArticles.map(async article => {
          const { urlToImage, _id } = article;

          const { url, public_id } = await uploadToCloudinary(urlToImage);

          const updatedArticle = await updateArticleDB(_id, public_id, url);

          return updatedArticle;
        })
      );

      return updatedArticles;
    },
  },
};
