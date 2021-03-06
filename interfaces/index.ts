//interfaces
export interface ArticleType {
  _id: string;
  publicId: string | null;
  source: {
    id: string;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
  __v: string;
}
