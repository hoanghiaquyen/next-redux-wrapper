import { API_URL } from "config/consts";
import makeRequest from "./makeRequest";

export const getProductList = (limit) =>
  makeRequest({
    url: limit ? `${API_URL}/products?limit=${limit}` : `${API_URL}/products`,
    method: "GET",
  });

export const getUserInfor = () =>
  makeRequest({
    url: `${API_URL}/users/1`,
    method: "GET",
  });

export const getUserCart = () =>
  makeRequest({
    url: `${API_URL}/carts/1`,
    method: "GET",
  });
