//importing axios
import axios from 'axios';

export const cloudinaryURLs = {
  avatar:
    'https://res.cloudinary.com/achraf-dev/image/upload/v1621466007/avatar_tzzojy.jpg',
  iconDot:
    'https://res.cloudinary.com/achraf-dev/image/upload/v1621468221/icon-dot_qqjtrx.jpg',
  logo: 'https://res.cloudinary.com/achraf-dev/image/upload/v1621468255/logo_cz2gqx.svg',
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
