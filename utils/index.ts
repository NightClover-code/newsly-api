//importing axios
import axios from 'axios';

export const cloudinaryURLs = {
  avatar:
    'https://res.cloudinary.com/achraf-dev/image/upload/v1621466007/avatar_tzzojy.jpg',
  iconArrow:
    'https://res.cloudinary.com/achraf-dev/image/upload/v1621466138/icon-arrow_t3lrof.svg',
  iconDot:
    'https://res.cloudinary.com/achraf-dev/image/upload/v1621468221/icon-dot_qqjtrx.jpg',
  iconQuotes:
    'https://res.cloudinary.com/achraf-dev/image/upload/v1621468255/icon-quotes_tirgqk.svg',
  iconSearch:
    'https://res.cloudinary.com/achraf-dev/image/upload/v1621468255/icon-search_fawsjz.svg',
  logoFooter:
    'https://res.cloudinary.com/achraf-dev/image/upload/v1621468256/logo-footer_sjeart.svg',
};

export const newsAPI = axios.create({
  baseURL: 'https://newsapi.org/v2',
});
