import cartReducer from "modules/cart/cartReducer";
import shopReducer from "modules/shop/shopReducer";
import userReducer from "modules/user/userReducer";
import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";

export const SET_IS_SERVER = "SET_IS_SERVER";

// this is to set a flag for initial server renders
function serverCheck(state = { isServer: false }, action) {
  const { type } = action;

  switch (type) {
    case SET_IS_SERVER: {
      return { ...state, isServer: true };
    }

    default:
      return state;
  }
}

// we hydrate only if this is the initial server render
function hydrate(state = {}, action) {
  const { type } = action;
  switch (type) {
    case HYDRATE:
      if (action.payload.serverCheck.isServer) {
        return { ...state, ...action.payload };
      }
      return state;

    default:
      return state;
  }
}

const combineReducer = combineReducers({
  serverCheck,
  shop: shopReducer,
  user: userReducer,
  cart: cartReducer,
});

function rootReducer(state, action) {
  const intermediateState = combineReducer(state, action);
  return hydrate(intermediateState, action);
}

export default rootReducer;
