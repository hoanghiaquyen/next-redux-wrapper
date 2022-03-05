import { GET_USER_CART_TRIGGER } from "./cartConstants";

export const triggerUserCart = (isServer) => ({
  type: GET_USER_CART_TRIGGER,
  isServer,
});
