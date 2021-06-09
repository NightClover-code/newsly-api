//importing utils
import { newsAPI } from './index';
import cloudinary from 'cloudinary';
import Article from '../models/article';
import { ArticleType } from '../interfaces';

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

    return articles;
  } catch (error) {
    console.log(error);
  }
};

export const uploadToCloudinary = async (urlToImage: string) => {
  try {
    const { url, public_id } = await cloudinary.v2.uploader.upload(urlToImage);

    return { url, public_id };
  } catch (err) {
    console.log(err);
    return { url: 'Could not upload the url.', public_id: null };
  }
};

export const destroyFromCloudinary = async (publicId: string) => {
  try {
    await cloudinary.v2.uploader.destroy(publicId);
  } catch (err) {
    console.log(err);
  }
};

export const deleteArticlesDB = async () => {
  try {
    await Article.deleteMany({});
  } catch (err) {
    console.log(err);
  }
};

export const getArticlesDB = async () => {
  try {
    const savedArticles = await Article.find({});

    return savedArticles as ArticleType[];
  } catch (err) {
    console.log(err);
  }
};

export const createArticleDB = async (article: ArticleType) => {
  try {
    const savedArticle = await Article.create(article);

    return savedArticle;
  } catch (err) {
    console.log(err);
  }
};

export const updateArticleDB = async (
  _id: string,
  public_id: string | null,
  url: string
) => {
  try {
    if (public_id) {
      const updatedArticle = await Article.findByIdAndUpdate(
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
