import {
  GET_USER_CART_FAILURE,
  GET_USER_CART_REQUEST,
  GET_USER_CART_SUCCESS,
} from "./cartConstants";

const initialState = {
  loading: false,
  error: false,
  userCart: false,
  productList: false,
};

const cartReducer = (state = initialState, action) => {
  const { type, productList, userCart, error } = action;
  switch (type) {
    case GET_USER_CART_REQUEST:
      return { ...state, loading: true, error: false };

    case GET_USER_CART_SUCCESS:
      return { ...state, loading: false, productList, userCart, error: false };

    case GET_USER_CART_FAILURE:
      return { ...state, loading: false, error: JSON.stringify(error) };

    default:
      return state;
  }
};

export default cartReducer;
