//importing axios
import axios from 'axios';

export const cloudinaryURLs = {
  avatar:
    'https://res.cloudinary.com/achraf-dev/image/upload/v1621466007/avatar_tzzojy.jpg',
  heroShape:
    'https://res.cloudinary.com/achraf-dev/image/upload/v1621466139/hero-shape_a6mlry.svg',
  heroTriangles:
    'https://res.cloudinary.com/achraf-dev/image/upload/v1621466139/hero-shape_a6mlry.svg',
  iconArrow:
    'https://res.cloudinary.com/achraf-dev/image/upload/v1621466138/icon-arrow_t3lrof.svg',
  iconDot:
    'https://res.cloudinary.com/achraf-dev/image/upload/v1621468221/icon-dot_qqjtrx.jpg',
  iconFacebook:
    'https://res.cloudinary.com/achraf-dev/image/upload/v1621468254/icon-facebook_qjgfx7.svg',
  logo: 'https://res.cloudinary.com/achraf-dev/image/upload/v1621468255/logo_cz2gqx.svg',
  iconLinkedIn:
    'https://res.cloudinary.com/achraf-dev/image/upload/v1621468255/icon-linkedin_im971h.svg',
  iconQuotes:
    'https://res.cloudinary.com/achraf-dev/image/upload/v1621468255/icon-quotes_tirgqk.svg',
  iconSearch:
    'https://res.cloudinary.com/achraf-dev/image/upload/v1621468255/icon-search_fawsjz.svg',
  iconTwitter:
    'https://res.cloudinary.com/achraf-dev/image/upload/v1621468255/icon-twitter_zpyely.svg',
  logoBusiness:
    'https://res.cloudinary.com/achraf-dev/image/upload/v1621468256/logo-business_rpynfz.svg',
  logoFooter:
    'https://res.cloudinary.com/achraf-dev/image/upload/v1621468256/logo-footer_sjeart.svg',
  logoEntertainement:
    'https://res.cloudinary.com/achraf-dev/image/upload/v1621468256/logo-entertainement_yysdww.svg',
  logoGeneral:
    'https://res.cloudinary.com/achraf-dev/image/upload/v1621468256/logo-general_k1z29i.svg',
  logoHealth:
    'https://res.cloudinary.com/achraf-dev/image/upload/v1621468256/logo-health_op0kr1.svg',
  logoScience:
    'https://res.cloudinary.com/achraf-dev/image/upload/v1621468257/logo-science_qptepx.svg',
  logoSports:
    'https://res.cloudinary.com/achraf-dev/image/upload/v1621468258/logo-sports_wlklwa.svg',
  logoTechnology:
    'https://res.cloudinary.com/achraf-dev/image/upload/v1621468258/logo-technology_gdzmeu.svg',
};

export const newsAPI = axios.create({
  baseURL: 'https://newsapi.org/v2',
});
