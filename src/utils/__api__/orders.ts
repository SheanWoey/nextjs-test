/* eslint-disable */
import { cache } from "react";
import axios from "axios";
import Order from "models/Order.model";

const getOrders = cache(async (): Promise<Order[]> => {
  const response = await axios.get("/api/users/orders");
  return response.data;
});

const getIds = cache(async (): Promise<{ params: { id: string } }[]> => {
  const response = await axios.get("/api/users/order-ids");
  return response.data;
});

const getOrder = cache(async (id: string): Promise<Order> => {
  const response = await axios.get("/api/users/order", { params: { id } });
  return response.data;
});

export default { getOrders, getOrder, getIds };
