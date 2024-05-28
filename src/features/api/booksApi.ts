import { CreateBookResponse, ISearchResponse } from "./../../types/booksTypes";
import { MD5 } from "crypto-js";
import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { IAllBooksResponse } from "../../types/booksTypes";
import { ErrorMessage } from "../../types/authTypes";

const customBaseQuery = async (
  args: any,
  api: BaseQueryApi,
  extraOptions: any
) => {
  const { method, url, body } = args;

  const baseResult = await fetchBaseQuery({
    baseUrl: "https://no23.lavina.tech/",
    prepareHeaders: (headers, api) => {
      const user = JSON.parse(localStorage.getItem("user") as string);
      if (!user && !["signUp", "signIn"].includes(api.endpoint)) {
        localStorage.removeItem("user");
        window.location.href = "/login";
      } else {
        headers.set("Key", user.data.key);
        method == "GET" || method == "DELETE"
          ? headers.set("Sign", `${MD5(`${method}/${url}${user.data.secret}`)}`)
          : headers.set(
              "Sign",
              `${MD5(
                `${method}/${url}${JSON.stringify(body)}${user.data.secret}`
              )}`
            );
      }
      return headers;
    },
  })(args, api, extraOptions);

  if (baseResult.meta?.response?.status == 401) {
    localStorage.removeItem("user");
    window.location.href = "/login";
  }
  return baseResult;
};

export const booksApi = createApi({
  reducerPath: "books",
  baseQuery: customBaseQuery as BaseQueryFn<
    string | FetchArgs,
    unknown,
    ErrorMessage
  >,
  tagTypes: ["IAllBooksResponse", "ISearchResponse"],
  endpoints: (builder) => ({
    allBooks: builder.query<IAllBooksResponse, void>({
      query: () => ({
        url: "books",
        method: "GET",
      }),
      providesTags: ["IAllBooksResponse"],
    }),

    searchBooks: builder.query<ISearchResponse, string>({
      query: (title = "") => ({
        url: `books/${title}`,
        method: "GET",
      }),
      providesTags: ["ISearchResponse"],
    }),

    createBook: builder.mutation<CreateBookResponse, { isbn: string }>({
      query: (body) => ({
        url: "books",
        method: "POST",
        body,
      }),
      invalidatesTags: ["IAllBooksResponse"],
    }),

    updateBook: builder.mutation<
      CreateBookResponse,
      { data: { status: number }; id: number }
    >({
      query: (formData) => ({
        url: `books/${formData.id}`,
        method: "PATCH",
        body: formData.data,
      }),
      invalidatesTags: ["IAllBooksResponse"],
    }),

    deleteBooks: builder.mutation<IAllBooksResponse, number>({
      query: (id) => ({
        url: `books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["IAllBooksResponse"],
    }),
  }),
});

export const {
  useAllBooksQuery,
  useCreateBookMutation,
  useDeleteBooksMutation,
  useUpdateBookMutation,
  useSearchBooksQuery,
} = booksApi;
