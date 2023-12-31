/* eslint-disable comma-dangle */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const BWICoreApi = createApi({
  reducerPath: 'bwiCoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dummyjson.com',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/products',
    }),
    searchProducts: builder.query({
      query: ({ searchQuery }) => {
        // console.log(searchQuery);
        // if (!searchQuery) return;
        return { url: `/products/search?q=${searchQuery}` };
      },
    }),
  }),
});

export const { useGetProductsQuery, useSearchProductsQuery } = BWICoreApi;
