import {
  GET_PRODUCT_LIST_REQUEST,
  GET_PRODUCT_LIST_SUCCESS,
  GET_PRODUCT_LIST_FAILURE,
  SEARCH_PRODUCT_LIST_SUCCESS,
  CLEAR_SEARCH,
} from "./shopConstants";

const initialState = {
  loading: false,
  error: false,
  productList: false,
  searchString: false,
  productListFiltered: [],
};

const shopReducer = (
  state = initialState,
  { type, result, searchString, error }
) => {
  switch (type) {
    case GET_PRODUCT_LIST_REQUEST:
      return { ...state, searchString: false, loading: true, error: false };

    case GET_PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        productList: result,
        productListFiltered: result,
        error: false,
      };

    case GET_PRODUCT_LIST_FAILURE:
      return { ...state, loading: false, error };

    case SEARCH_PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        productListFiltered: result,
        searchString,
        error: false,
      };

    case CLEAR_SEARCH:
      return {
        ...state,
        productListFiltered: state.productList,
        searchString: false,
      };

    default:
      return state;
  }
};

export default shopReducer;
