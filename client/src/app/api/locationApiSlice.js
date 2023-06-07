import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const locationApiSlice = createApi({
  reducerPath: 'locationApi',
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
  tagTypes: ['locationList', 'location'],
  endpoints: (builder) => ({
    // this method gets all the locations
    getLocationList: builder.query({
      query: (params = {}) => ({
        url: '/location',
        method: 'GET',
        params: {
          workspaces: params.workspaces,
          page: params.page,
          size: params.size
        }
      }),
      providesTags: ['locationList'],
      transformResponse: (response, meta, args) => {
        const pages = Number(meta.response.headers.get('X-Total-Pages'));

        return [response, pages];
      },
      invalidatesTags: ['locationList']
    }),
    getLocationSearchList: builder.query({
      query: (params = {}) => ({
        url: '/location',
        method: 'GET',
        params: {
          name: params.name,
          size: params.size,
          page: params.page
        }
      }),
      providesTags: ['locationList'],
      transformResponse: (response, meta, args) => {
        const pages = Number(meta.response.headers.get('X-Total-Pages'));

        return [response, pages];
      },
      invalidatesTags: ['locationList']
    }),
    // this method creates a new location
    createLocation: builder.mutation({
      query: (body) => ({
        url: '/location',
        method: 'POST',
        body
      }),
      invalidatesTags: ['locationList']
    }),
    // this method gets a location by the id
    getLocation: builder.query({
      query: (id) => `/location/${id}`,
      providesTags: ['location']
    }),
    // this method updates a location by the id
    updateLocation: builder.mutation({
      query: ({ id, body }) => ({
        url: `/location/${id}`,
        method: 'PUT',
        body
      }),
      invalidatesTags: ['locationList', 'location']
    }),
    // this method deletes a location by the id
    deleteLocation: builder.mutation({
      query: (id) => ({
        url: `/location/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['locationList']
    })
  })
});

export const {
  useGetLocationListQuery,
  useGetLocationSearchListQuery,
  useCreateLocationMutation,
  useGetLocationQuery,
  useUpdateLocationMutation,
  useDeleteLocationMutation
} = locationApiSlice;
