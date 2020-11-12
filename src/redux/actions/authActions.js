import { SET_CURRENT_USER, LOGOUT_USER, SET_ERRORS } from "../types";
import axios from "axios";
import { ROUTES } from "../../utils/routes";
import setAuthToken from "../../utils/setAuthToken";
import { setErrors } from "../actions/errorActions";
import jwtDecode from "jwt-decode";
import sweetAlert from "sweetalert";

//Register User
export const LoginUser = (data) => async (dispatch) => {
  try {
    let response = await axios.post(ROUTES.AdminLogin, data);
    const { token } = response;
    console.log(response);

    //set current user
    dispatch(setCurrentUser(data.email));
    sweetAlert({
      title: "You are logged in!",
      icon: "success",
    });

    //Set Token to axios header
    setAuthToken(token);

    //Save to local storage
    localStorage.setItem("jwtToken", token);
  } catch (error) {
    // console.log(error.response.data);
    let { message } = error.response.data;
    dispatch(setErrors(message));
  }
};

//Set Current user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

//Log user out
export const logoutUser = () => {
  return {
    type: LOGOUT_USER,
  };
};
