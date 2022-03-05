import {
  GET_PRODUCT_LIST_TRIGGER,
  SEARCH_PRODUCT_LIST_TRIGGER,
  CLEAR_SEARCH,
} from "./shopConstants";

export const triggerProductList = (limit) => ({
  type: GET_PRODUCT_LIST_TRIGGER,
  limit,
});
export const triggerProductSearch = (searchString) => ({
  type: SEARCH_PRODUCT_LIST_TRIGGER,
  searchString,
});

export const clearProductSearch = () => ({
  type: CLEAR_SEARCH,
});
