import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const roleApiSlice = createApi({
  reducerPath: 'roleApi',
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
  tagTypes: ['roleList', 'role'],
  endpoints: (builder) => ({
    // this method gets all roles
    getRoleList: builder.query({
      query: () => '/role',
      providesTags: ['roleList', 'role'],
      transformResponse: (response, meta) => {
        const pages = Number(meta.response.headers.get('X-Total-Pages'));
        return [response, pages];
      }
    }),

    // this method gets a role by the id
    getRole: builder.query({
      query: (id) => `/role/${id}`,
      providesTags: ['role']
    }),

    // this method creates a new role
    createRole: builder.mutation({
      query: (body) => ({
        url: '/role',
        method: 'POST',
        body
      }),
      invalidatesTags: ['roleList']
    }),

    // this method updates a role by the id
    updateRole: builder.mutation({
      query: ({ id, body }) => {
        return {
          url: `/role/${id}`,
          method: 'PUT',
          body
        };
      },
      invalidatesTags: ['roleList', 'role']
    }),

    // this method deletes a role by the id
    deleteRole: builder.mutation({
      query: (id) => ({
        url: `/role/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['roleList', 'role']
    })
  })
});

export const {
  useGetRoleQuery,
  useGetRoleListQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation
} = roleApiSlice;
