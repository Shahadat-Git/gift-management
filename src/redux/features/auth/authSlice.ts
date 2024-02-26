/* eslint-disable @typescript-eslint/no-unused-vars */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type TUser = {
  _id?: string | undefined;
  username?: string | undefined;
  name?: string | undefined;
  role?: string | undefined;
  email?: string | undefined;
};
type TInitialState = {
  token: string | null;
  user: TUser | null;
};
const initialState: TInitialState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authLogin: (state, action: PayloadAction<TInitialState>) => {
      const { token, user } = action.payload;
      state.token = token;
      state.user = user;
    },
    logOut: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

export default authSlice.reducer;

export const { authLogin, logOut } = authSlice.actions;
