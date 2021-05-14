//importing utils
import newsAPI from '../utils';
import cloudinary from 'cloudinary';
import Article from '../models/article';

//resolvers
export const resolvers = {
  Query: {
    articles: async () => {
      // fetching raw articles
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
      //initialize cloudinary
      cloudinary.v2.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });

      //saving articles with different content
      const savedArticles = Article.find({});

      articles.map(async (article: any, index: number) => {
        if (article.content !== savedArticles[index].content) {
          const articleToSave = new Article(article);
          const savedArticle = await articleToSave.save();
        }
      });

      return savedArticles;
    },
  },
};
