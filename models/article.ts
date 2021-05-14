//importing dependencies
import { Schema, model } from 'mongoose';

//schema
const articleSchema = new Schema({
  source: {
    id: String,
    name: String,
  },
  author: String,
  title: String,
  description: String,
  url: String,
  urlToImage: String,
  publishedAt: String,
  content: String,
});

//model
const Article = model('Article', articleSchema);

export default Article;
