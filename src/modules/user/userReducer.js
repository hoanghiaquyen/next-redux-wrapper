import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
} from "./userConstants";

const { HYDRATE } = require("next-redux-wrapper");

const initialState = {
  loading: false,
  error: false,
  userInfor: false,
};
const userReducer = (
  state = initialState,
  { type, result, error, payload }
) => {
  switch (type) {
    // this is only needed if you use getStaticProps like in pages/user_static/index.js
    case HYDRATE: {
      if (payload.user.userInfor) {
        return {
          ...state,
          ...payload.user,
        };
      }
      return state;
    }

    case GET_USER_REQUEST:
      return { ...state, loading: true, error: false };
    case GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfor: result,
        error: false,
      };
    case GET_USER_FAILURE:
      return { ...state, loading: false, error: JSON.stringify(error) };
    default:
      return state;
  }
};

export default userReducer;
