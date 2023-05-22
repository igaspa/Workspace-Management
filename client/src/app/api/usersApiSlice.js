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
			providesTags: ['userList'],
			query: (params) => {
				const queryParameters = {
					...(params?.email && { email: params.email })
				};
				return {
					url: '/user',
					method: 'GET',
					params: queryParameters
				};
			},
			invalidatesTags: ['userList']
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
			query: ({ id, body }) => ({
				url: `/user/${id}`,
				method: 'PUT',
				body
			}),
			invalidatesTags: ['usersList', 'user']
		}),
		// this method deletes a user by the id
		deleteUser: builder.mutation({
			query: (id) => ({
				url: `/user/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['usersList']
		})
	})
});

export const {
	useGetUsersListQuery,
	useCreateUserMutation,
	useGetUserQuery,
	useUpdateUserMutation,
	useDeleteUserMutation
} = usersApiSlice;
