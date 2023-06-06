import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const workspaceTypesApiSlice = createApi({
	reducerPath: 'workspaceTypeApi',
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
	tagTypes: ['workspaceTypesList', 'workspaceType'],
	endpoints: (builder) => ({
		// this method gets all the workspaceTypes
		getWorkspaceTypesList: builder.query({
			query: (params = {}) => ({
				url: '/workspace-type',
				method: 'GET',
				params: {
					page: params.page,
					size: params.size
				}
			}),
			providesTags: ['workspaceTypesList'],
			transformResponse: (response, meta, args) => {
				const pages = Number(meta.response.headers.get('X-Total-Pages'));

				return [response, pages];
			}
		}),
		getWorkspaceTypeSearchList: builder.query({
			query: (params = {}) => ({
				url: '/workspace-type',
				method: 'GET',
				params: {
					name: params.name,
					size: params.size,
					page: params.page
				}
			}),
			providesTags: ['workspaceTypesList'],
			transformResponse: (response, meta, args) => {
				const pages = Number(meta.response.headers.get('X-Total-Pages'));

				return [response, pages];
			}
		}),
		// get workspaces in one workspace-type
		getWorkspacesByType: builder.query({
			query: (id, params = {}) => ({
				url: `/workspace-type/${id}`,
				method: 'GET',
				params: {
					workspaces: params.workspaces
				}
			}),
			providesTags: ['workspaceTypesList']
		}),
		// this method creates a new workspaceType
		createWorkspaceType: builder.mutation({
			query: (body) => ({
				url: '/workspace-type',
				method: 'POST',
				body
			}),
			invalidatesTags: ['workspaceTypesList']
		}),
		// this method gets a workspaceType by the id
		getWorkspaceType: builder.query({
			query: (id) => `/workspace-type/${id}`,
			providesTags: ['workspaceType']
		}),
		// this method updates a workspaceType by the id
		updateWorkspaceType: builder.mutation({
			query: ({ id, body }) => ({
				url: `/workspace-type/${id}`,
				method: 'PUT',
				body
			}),
			invalidatesTags: ['workspaceTypesList', 'workspaceType']
		}),
		// this method deletes a workspaceType by the id
		deleteWorkspaceType: builder.mutation({
			query: (id) => ({
				url: `/workspace-type/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['workspaceTypesList']
		})
	})
});

export const {
	useGetWorkspaceTypesListQuery,
	useGetWorkspaceTypeSearchListQuery,
	useCreateWorkspaceTypeMutation,
	useGetWorkspaceTypeQuery,
	useUpdateWorkspaceTypeMutation,
	useDeleteWorkspaceTypeMutation,
	useGetWorkspacesByTypeQuery
} = workspaceTypesApiSlice;
