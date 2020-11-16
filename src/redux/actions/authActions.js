import { SET_CURRENT_USER, LOGOUT_USER, SET_ERRORS } from "../types";
import axios from "axios";
import { ROUTES } from "../../utils/routes";
import setAuthToken from "../../utils/setAuthToken";
import { setErrors } from "../actions/errorActions";
import sweetAlert from "sweetalert";

//Register User
export const LoginUser = (data) => async (dispatch) => {
  try {
    let response = await axios.post(ROUTES.AdminLogin, data);
    const { token } = response.data;
    console.log(response);

    //set current user
    dispatch(setCurrentUser({ email: data.email }));
    sweetAlert({
      title: "You are logged in!",
      icon: "success",
    });

    //Set Token to axios header
    let jwtToken = token.split(" ");
    setAuthToken(token);

    //Save to local storage
    localStorage.setItem("jwtToken", jwtToken[1]);
  } catch (error) {
    // console.log(error.response.data);
    let { message } = error.response.data;
    dispatch(setErrors(message));
  }
};

//Set Current user
export const setCurrentUser = (payload) => {
  console.log("setUser");
  return {
    type: SET_CURRENT_USER,
    payload,
  };
};

//Log user out
export const logoutUser = () => {
  //Remove token from local storage
  localStorage.removeItem("jwtToken");
  //remove auth header
  setAuthToken(null);
  return {
    type: LOGOUT_USER,
  };
};
