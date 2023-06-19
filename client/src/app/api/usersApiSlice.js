import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const usersApiSlice = createApi({
  reducerPath: 'usersApi',
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
  tagTypes: ['usersList', 'user'],
  endpoints: (builder) => ({
    getUsersList: builder.query({
      providesTags: ['usersList'],
      query: (params) => {
        const queryParameters = {
          ...(params.size && { size: params.size }),
          ...(params?.email && { email: params.email }),
          page: params.page
        };
        let url = '/user';
        const { include } = params;
        if (include && include.length) {
          include.forEach((el) => {
            url += `?include=${el}`;
          });
        }
        return {
          url,
          method: 'GET',
          params: queryParameters
        };
      },
      transformResponse: (response, meta, args) => {
        const pages = Number(meta.response.headers.get('X-Total-Pages'));

        return [response, pages];
      },
      invalidatesTags: ['usersList']
    }),

    getUsersSearchList: builder.query({
      query: (params) => {
        const queryParameters = {
          email: params.email,
          size: params.size,
          page: params.page
        };
        let url = '/user';
        const { include } = params;
        if (include && include.length) {
          include.forEach((el) => {
            url += `?include=${el}`;
          });
        }
        return {
          url,
          method: 'GET',
          params: queryParameters
        };
      },
      providesTags: ['usersList'],
      transformResponse: (response, meta, args) => {
        const pages = Number(meta.response.headers.get('X-Total-Pages'));

        return [response, pages];
      },
      invalidatesTags: ['usersList']
    }),
    // this method creates a new user
    createUser: builder.mutation({
      query: (body) => ({
        url: '/user',
        method: 'POST',
        body
      }),
      invalidatesTags: ['usersList']
    }),

    // this method gets a user by the id
    getUser: builder.query({
      query: (id) => `/user/${id}`,
      providesTags: ['user']
    }),

    // this method updates a user by the id
    updateUser: builder.mutation({
      query: (params) => {
        return {
          url: `/user/${params.id}`,
          method: 'PUT',
          body: params.body
        };
      },
      invalidatesTags: ['usersList', 'user']
    }),

    // this method creates users password
    createUserPassword: builder.mutation({
      query: (params) => {
        return {
          url: `/user/password-create?token=${params.token}`,
          method: 'PUT',
          body: params.body
        };
      },
      invalidatesTags: ['usersList', 'user']
    }),

    // this method reinvites user to application
    reinviteUser: builder.mutation({
      query: ({ body }) => ({
        url: `/user/reinvite`,
        method: 'PUT',
        body
      }),
      invalidatesTags: ['usersList', 'user']
    }),

    // this method deletes a user by the id
    deleteUser: builder.mutation({
      query: (params) => {
        return {
          url: `/user/${params.id}`,
          method: 'DELETE'
        };
      },
      invalidatesTags: ['usersList']
    })
  })
});

export const {
  useGetUsersListQuery,
  useGetUsersSearchListQuery,
  useCreateUserMutation,
  useCreateUserPasswordMutation,
  useGetUserQuery,
  useUpdateUserMutation,
  useReinviteUserMutation,
  useDeleteUserMutation
} = usersApiSlice;
