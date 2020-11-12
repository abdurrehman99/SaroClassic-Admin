import { SET_ERRORS } from "../types";

//Set Error
export const setErrors = (data) => {
  return {
    type: SET_ERRORS,
    payload: data,
  };
};
