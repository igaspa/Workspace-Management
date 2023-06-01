import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const loginApiSlice = createApi({
  reducerPath: 'loginApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SERVER_API_URL
  }),
  tagTypes: ['login'],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: '/login',
        method: 'POST',
        body
      }),
      invalidatesTags: ['login']
    })
  })
});

export const { useLoginMutation } = loginApiSlice;
