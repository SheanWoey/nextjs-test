/* eslint-disable */
import Shop from "./Shop.model";
import Review from "./Review.model";

interface Product {
  unit?: any;
  slug: string;
  price: number;
  title: string;
  rating: number;
  discount: number;
  thumbnail: string;
  id: string;
  shop?: Shop;
  brand?: string | null;
  size?: string[] | null;
  status?: string | null;
  colors?: string[];
  images?: string[];
  categories: any[];
  reviews?: Review[];
  published?: boolean;
}

export default Product;
