import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // user login
    getLogin: builder.mutation({
      query: (data) => {
        return {
          url: "users/login",
          method: "POST",
          body: data,
        };
      },
    }),

    // user register
    getRegister: builder.mutation({
      query: (data) => {
        return {
          url: "users/create-user",
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const { useGetRegisterMutation, useGetLoginMutation } = authApi;
