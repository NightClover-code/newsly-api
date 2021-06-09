//importing utils
import { newsAPI } from './index';
import cloudinary from 'cloudinary';

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
