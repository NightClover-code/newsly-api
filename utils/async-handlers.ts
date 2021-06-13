//importing utils
import { newsAPI } from './index';
import cloudinary from 'cloudinary';
import Article from '../models/article';
import { ArticleType } from '../interfaces';

//importing gql utils
import { request } from 'graphql-request';
import { saveAndUpdateArticlesMutation } from '../graphql';

//raw newsAPI articles
export const getArticles = async () => {
  try {
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

    return articles as ArticleType[];
  } catch (err) {
    console.log(err);
    return [];
  }
};

//uploading images to cloudinary
export const uploadToCloudinary = async (urlToImage: string) => {
  try {
    const res = await cloudinary.v2.uploader.upload(urlToImage);

    return res;
  } catch (err) {
    console.log(err);
    return { url: null, public_id: null };
  }
};

//destroying old images
export const destroyFromCloudinary = async (publicId: string) => {
  try {
    await cloudinary.v2.uploader.destroy(publicId);
  } catch (err) {
    console.log(err);
  }
};

//deleting all database articles
export const deleteArticlesDB = async () => {
  try {
    await Article.deleteMany({});
  } catch (err) {
    console.log(err);
  }
};

//getting all database articles
export const getArticlesDB = async () => {
  try {
    const savedArticles = await Article.find({});

    return savedArticles as ArticleType[];
  } catch (err) {
    console.log(err);
  }
};

//creating an article in database
export const createArticleDB = async (article: ArticleType) => {
  try {
    const savedArticle = await Article.create(article);

    return savedArticle;
  } catch (err) {
    console.log(err);
  }
};

//updating an article in database
export const updateArticleDB = async (
  _id: string,
  public_id: string | null,
  url: string | null
) => {
  try {
    if (public_id) {
      const updatedArticle = await Article.findByIdAndUpdate(
        _id,
        {
          publicId: public_id,
          urlToImage: url,
        },
        { lean: true, new: true }
      );

      return updatedArticle;
    }
  } catch (err) {
    console.log(err);
  }
};

//saving and updating articles from the server
export const saveAndUpdateArticles = async () => {
  try {
    await request(process.env.NEWSLY_API_URL!, saveAndUpdateArticlesMutation);
  } catch (err) {
    console.log(err);
  }
};
