import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const reservationsApiSlice = createApi({
  reducerPath: 'reservationApi',
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
  tagTypes: ['reservationsList', 'reservation'],
  endpoints: (builder) => ({
    // this method gets users reservations
    getUsersReservationList: builder.query({
      query: () => '/reservation?include=user&include=workspace',
      providesTags: ['reservationsList', 'reservation'],
      transformResponse: (response, meta) => {
        const pages = Number(meta.response.headers.get('X-Total-Pages'));

        return [response, pages];
      }
    }),

    // this method gets all the reservations
    getReservationsList: builder.query({
      query: () => '/reservation/all?include=user&include=workspace',
      providesTags: ['reservationsList', 'reservation'],
      transformResponse: (response, meta) => {
        const pages = Number(meta.response.headers.get('X-Total-Pages'));

        return [response, pages];
      }
    }),

    // this method gets all reservations with specific workspaceId
    getReservationsFromWorkspace: builder.query({
      providesTags: ['reservationsList'],
      query: (params) => {
        const queryParameters = {
          ...(params.from && { from: params.from }),
          ...(params.until && { until: params.until }),
          page: params.page,
          workspaceId: params.workspaceId
        };

        const size = params.size || 5;

        return {
          url: `/reservation/all?include=user&size=${size}`,
          method: 'GET',
          params: queryParameters
        };
      },
      transformResponse: (response, meta, args) => {
        const pages = Number(meta.response.headers.get('X-Total-Pages'));
        return [response, pages];
      },
      invalidatesTags: ['reservationsList']
    }),
    // this method creates a new reservation
    createReservation: builder.mutation({
      query: (body) => ({
        url: '/reservation',
        method: 'POST',
        body
      }),
      invalidatesTags: ['reservationsList']
    }),
    // this method creates a new permanent  reservation
    createPermanentReservation: builder.mutation({
      query: (body) => ({
        url: '/reservation/permanent',
        method: 'POST',
        body
      }),
      invalidatesTags: ['reservationsList']
    }),
    // this method gets a reservation by the id
    getReservation: builder.query({
      query: (id) => `/reservation/${id}`,
      providesTags: ['reservation']
    }),
    // this method updates a reservation by the id
    updateReservation: builder.mutation({
      query: ({ id, body }) => {
        return {
          url: `/reservation/${id}`,
          method: 'PUT',
          body
        };
      },
      invalidatesTags: ['reservationsList', 'reservation']
    }),
    // this method deletes a reservation by the id
    deleteReservation: builder.mutation({
      query: (id) => ({
        url: `/reservation/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['reservationsList', 'reservation']
    })
  })
});

export const {
  useGetUsersReservationListQuery,
  useGetReservationsListQuery,
  useGetReservationsFromWorkspaceQuery,
  useCreateReservationMutation,
  useCreatePermanentReservationMutation,
  useGetReservationQuery,
  useUpdateReservationMutation,
  useDeleteReservationMutation
} = reservationsApiSlice;
