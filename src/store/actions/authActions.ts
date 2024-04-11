import axios from "../../axios/axios";
import { AuthData, AuthResponse } from "../../models/models";
import { login } from "../slices/authSlice";
import { AppDispatch } from "../store";

export const loginAction = (data: AuthData) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post<AuthResponse>(
        "api/v1/account/login",
        data
      );
      dispatch(
        login({
          login: data.login,
          accessToken: response.data.accessToken,
        })
      );
      return response;
    } catch (error) {
      console.log("Error login", error);
    }
  };
};
