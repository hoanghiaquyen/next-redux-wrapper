import { API_URL } from "config/consts";
import makeRequest from "./makeRequest";

export const getProductList = (limit) =>
  makeRequest({
    url: limit ? `${API_URL}/products?limit=${limit}` : `${API_URL}/products`,
    method: "GET",
  });

export const getUserInfor = (userId) =>
  makeRequest({
    url: `${API_URL}/users/${userId}`,
    method: "GET",
  });

export const getUserCart = (userId) =>
  makeRequest({
    url: `${API_URL}/carts/${userId}`,
    method: "GET",
  });
