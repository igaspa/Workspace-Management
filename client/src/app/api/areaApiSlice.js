import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const areaApiSlice = createApi({
  reducerPath: 'areaApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SERVER_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  tagTypes: ['areaList', 'area'],
  endpoints: (builder) => ({
    // this method gets all the areas
    getAreaList: builder.query({
      query: (params = {}) => ({
        url: '/area?include=location',
        method: 'GET',
        params: {
          workspaces: params.workspaces,
          size: params.size,
          page: params.page
        }
      }),
      providesTags: ['areaList'],
      transformResponse: (response, meta, args) => {
        const pages = Number(meta.response.headers.get('X-Total-Pages'));

        return [response, pages];
      },
      invalidatesTags: ['areaList']
    }),
    getAreaSearchList: builder.query({
      query: (params = {}) => ({
        url: '/area?include=location',
        method: 'GET',
        params: {
          name: params.name,
          size: params.size,
          page: params.page
        }
      }),
      providesTags: ['areaList'],
      transformResponse: (response, meta, args) => {
        const pages = Number(meta.response.headers.get('X-Total-Pages'));

        return [response, pages];
      },
      invalidatesTags: ['areaList']
    }),
    // this method creates a new area
    createArea: builder.mutation({
      query: (body) => ({
        url: '/area',
        method: 'POST',
        body
      }),
      invalidatesTags: ['areaList']
    }),
    // this method gets a area by the id
    getArea: builder.query({
      query: (id) => `/area/${id}`,
      providesTags: ['area']
    }),
    // this method updates a area by the id
    updateArea: builder.mutation({
      query: ({ id, body }) => ({
        url: `/area/${id}`,
        method: 'PUT',
        body
      }),
      invalidatesTags: ['areaList', 'area']
    }),
    // this method deletes a area by the id
    deleteArea: builder.mutation({
      query: (id) => ({
        url: `/area/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['areaList']
    })
  })
});

export const {
  useGetAreaListQuery,
  useGetAreaSearchListQuery,
  useCreateAreaMutation,
  useGetAreaQuery,
  useUpdateAreaMutation,
  useDeleteAreaMutation
} = areaApiSlice;
