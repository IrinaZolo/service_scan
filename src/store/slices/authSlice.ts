import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  ACCESS_KEY,
  DOCS_KEY,
  EXPIRE_KEY,
  SEARCH_KEY,
  SEARCH_RESPONSE_KEY,
  USERNAME_KEY,
} from "../../models/models";

interface AuthState {
  accessToken: string;
  login: string;
  isAuth: boolean;
}

function getInitialState(): AuthState {
  const expireIn = localStorage.getItem(EXPIRE_KEY) ?? null;

  if (expireIn && new Date() > new Date(expireIn)) {
    localStorage.clear();

    return {
      accessToken: "",
      login: "",
      isAuth: false,
    };
  }

  return {
    accessToken: localStorage.getItem(ACCESS_KEY) ?? "",
    login: localStorage.getItem(USERNAME_KEY) ?? "",
    isAuth: Boolean(localStorage.getItem(ACCESS_KEY)),
  };
}

const initialState: AuthState = getInitialState();

interface AuthPayload {
  login: string;
  accessToken: string;
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<AuthPayload>) {
      state.login = action.payload.login;
      state.accessToken = action.payload.accessToken;
      state.isAuth = Boolean(action.payload.accessToken);

      const tokenExpire = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

      localStorage.setItem(ACCESS_KEY, action.payload.accessToken);
      localStorage.setItem(USERNAME_KEY, action.payload.login);
      localStorage.setItem(EXPIRE_KEY, tokenExpire.toString());
    },
    logout(state) {
      state.accessToken = "";
      state.login = "";
      state.isAuth = false;

      localStorage.clear();
    },
  },
});

export const { login, logout } = authSlice.actions;
// export const selectAllFilms = (state) => state.films;

export default authSlice.reducer;
