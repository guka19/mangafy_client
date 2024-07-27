export default interface Manga {
  _id: string;
  title: string;
  author: string;
  description: string;
  imageUrl: string;
  price: number;
  publishedDate: Date;
  genres: string[];
  volume: number;
  rating: number;
}
