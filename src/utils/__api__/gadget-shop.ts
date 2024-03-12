/* eslint-disable */
import { cache } from "react";
import axios from "axios";
import Blog from "models/Blog.model";
import Product from "models/Product.model";
import Category from "models/Category.model";
import { Banner } from "models/Gadget.model";

const getFeaturedCategories = cache(async (): Promise<Category[]> => {
  const response = await axios.get("/api/gadget-store/featured-categories");
  return response.data;
});

const getTwoBanner = cache(async (): Promise<Banner[]> => {
  const response = await axios.get("/api/gadget-store/two-banners");
  return response.data;
});

const getBlogLists = cache(async (): Promise<Blog[]> => {
  const response = await axios.get("/api/gadget-store/blog-lists");
  return response.data;
});

const getMainCarousel = cache(async () => {
  const response = await axios.get("/api/gadget-store/main-carousel");
  return response.data;
});

const getTopPicksList = cache(async (): Promise<Product[]> => {
  const response = await axios.get("/api/gadget-store/products?tag=top-picks");
  return response.data;
});

const getMostViewedList = cache(async (): Promise<Product[]> => {
  const response = await axios.get(
    "/api/gadget-store/products?tag=most-viewed",
  );
  return response.data;
});

const getNewArrival = cache(async (): Promise<Product[]> => {
  const response = await axios.get(
    "/api/gadget-store/products?tag=new-arrival",
  );
  return response.data;
});

export default {
  getTwoBanner,
  getBlogLists,
  getNewArrival,
  getMainCarousel,
  getTopPicksList,
  getMostViewedList,
  getFeaturedCategories,
};
