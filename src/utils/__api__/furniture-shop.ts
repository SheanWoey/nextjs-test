/* eslint-disable */
import { cache } from "react";
import axios from "axios";
// CUSTOM DATA MODELS
import Product from "models/Product.model";
import CategoryNavList from "models/CategoryNavList.model";
import { FurnitureCarouselItem } from "models/Carousel.model";

const getTopNewProducts = cache(async (): Promise<Product[]> => {
  const response = await axios.get("/api/furniture-shop/products?tag=new");
  return response.data;
});

const getTopSellingProducts = cache(async (): Promise<Product[]> => {
  const response = await axios.get(
    "/api/furniture-shop/products?tag=top-selling",
  );
  return response.data;
});

const getFurnitureProducts = cache(async (): Promise<Product[]> => {
  const response = await axios.get("/api/furniture-shop/all-products");
  return response.data;
});

const getFurnitureShopNavList = cache(async (): Promise<CategoryNavList[]> => {
  const response = await axios.get("/api/furniture-shop/navigation");
  return response.data;
});

const getMainCarouselData = cache(
  async (): Promise<FurnitureCarouselItem[]> => {
    const response = await axios.get("/api/furniture-shop/main-carousel");
    return response.data;
  },
);

export default {
  getTopNewProducts,
  getMainCarouselData,
  getFurnitureProducts,
  getTopSellingProducts,
  getFurnitureShopNavList,
};
