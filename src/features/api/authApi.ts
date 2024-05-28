import { MD5 } from "crypto-js";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  SignUpKeySecret,
  SignUpRequest,
  SignUpResponse,
} from "../../types/authTypes";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://no23.lavina.tech/",
  prepareHeaders: (headers, api) => {
    const user = JSON.parse(localStorage.getItem("user") as string);
    if (!user && api.endpoint !== "signUp" && api.endpoint !== "signIn") {
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return headers;
  },
});

export const authApi = createApi({
  reducerPath: "signUp",
  baseQuery,
  endpoints: (builder) => ({
    signUp: builder.mutation<SignUpResponse, SignUpRequest>({
      query: (body) => ({
        url: "signup",
        method: "POST",
        body,
        headers: {
          Key: body.key,
          Sign: `${MD5(`POST/signup${body}${body.secret}`)}`,
        },
      }),
    }),
    signIn: builder.mutation<SignUpResponse, SignUpKeySecret>({
      query: (body) => ({
        url: "myself",
        method: "GET",
        headers: {
          Key: body.key,
          Sign: `${MD5(`GET/myself${body.secret}`)}`,
        },
      }),
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation } = authApi;
