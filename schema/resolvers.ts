//importing utils
import newsAPI from '../utils';
import cloudinary from 'cloudinary';
import axios from 'axios';

//resolvers
export const resolvers = {
  Query: {
    articles: async () => {
      // fetching raw articles
      const { data } = await axios.get('http://localhost:4000/articles');

      return data;

      // return db.articles.list();
      // const data = [
      //   {
      //     author: 'WLWT Digital Staff',
      //     title:
      //       'Mask mandate, all Ohio virus orders will be lifted June 2 - WLWT Cincinnati',
      //     description:
      //       'The state of Ohio is removing all COVID-19 health orders, effective June 2.',
      //     urlToImage:
      //       'https://kubrick.htvapps.com/htv-prod-media.s3.amazonaws.com/images/dewine-orders-1620858978.jpg?crop=1.00xw:1.00xh;0,0&resize=1200:*',
      //     publishedAt: '2021-05-12T22:35:00Z',
      //     content:
      //       'COLUMBUS, Ohio —The state of Ohio is lifting all COVID-19 health orders, effective June 2.\r\nOhio Gov. Mike DeWine made that announcement Wednesday, saying that in three weeks, the state will remove h… [+2619 chars]',
      //   },
      // ];

      // const articles = data.map((article: any) => {
      //   const { author, title, description, publishedAt, content, urlToImage } =
      //     article;
      //   return {
      //     author,
      //     title,
      //     description,
      //     publishedAt,
      //     content,
      //     image: {
      //       id: null,
      //       urlToImage,
      //     },
      //   };
      // });
      // //initialize cloudinary
      // cloudinary.v2.config({
      //   cloud_name: process.env.CLOUDINARY_NAME,
      //   api_key: process.env.CLOUDINARY_API_KEY,
      //   api_secret: process.env.CLOUDINARY_API_SECRET,
      // });
      // //new articles with cloudinary photos
      // return articles.map(async (article: any) => {
      //   const {
      //     image: { urlToImage, id },
      //   } = article;
      //   try {
      //     const { etag, url } = await cloudinary.v2.uploader.upload(urlToImage);
      //     console.log(etag, id);
      //     if (etag !== id) {
      //       return {
      //         ...article,
      //         image: {
      //           id: etag,
      //           urlToImage: url,
      //         },
      //       };
      //     }
      //     return article;
      //   } catch (err) {
      //     return {
      //       ...article,
      //       urlToImage: `Image could not be uploaded`,
      //     };
      //   }
      // });
    },
  },
};
