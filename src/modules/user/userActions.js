import { GET_USER_TRIGGER } from "./userConstants";

export const triggerUserInfo = () => {
  return {
    type: GET_USER_TRIGGER,
  };
};
