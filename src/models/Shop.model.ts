/* eslint-disable */
import Product from "./Product.model";

interface Shop {
  id: string;
  slug: string;
  user: any;
  email: string;
  name: string;
  phone: string;
  address: string;
  rating?: number;
  verified: boolean;
  products?: any | Product[];
  coverPicture: string;
  profilePicture: string;
  socialLinks: {
    facebook?:  string | null;
    youtube?:  string | null;
    twitter?:  string | null;
    instagram?:  string | null;
  };
}

export default Shop;
