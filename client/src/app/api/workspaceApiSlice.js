import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const workspacesApiSlice = createApi({
	reducerPath: 'workspaceApi',
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
	tagTypes: ['workspacesList', 'workspace'],
	endpoints: (builder) => ({
		// this method gets all the workspaces
		getWorkspacesList: builder.query({
			providesTags: ['workspacesList'],
			query: (params) => {
				const queryParameters = {
					...(params.from && { from: params.from }),
					...(params.until && { until: params.until }),
					...(params.status && { status: params.status }),
					...(params.size && { size: params.size }),
					page: params.page,
					workspace_type: params.workspace_type,
					area_name: params.area_name
				};
				let url = '/workspace?include=equipment&include=area';
				const { include } = params;
				if (include && include.length) {
					include.forEach((el) => {
						url += (`&include=${el}`);
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
			invalidatesTags: ['workspacesList']
		}),
		getWorkspaceSearchList: builder.query({
			providesTags: ['workspacesList'],
			query: (params = {}) => ({
				url: '/workspace?include=workspaceType&include=equipment&include=area',
				method: 'GET',
				params: {
					name: params.name,
					page: params.page,
					size: params.size,

				}
			}),
			transformResponse: (response, meta, args) => {
				const pages = Number(meta.response.headers.get('X-Total-Pages'));

				return [response, pages];
			},
			invalidatesTags: ['workspacesList']
		}),

		// this method creates a new workspace
		createWorkspace: builder.mutation({
			query: (body) => ({
				url: '/workspace',
				method: 'POST',
				body
			}),
			invalidatesTags: ['workspacesList']
		}),

		// this method created list of workspaces
		createMultipleWorkspaces: builder.mutation({
			query: (body) => ({
				url: '/workspace/collection',
				method: 'POST',
				body
			}),
			invalidatesTags: ['workspacesList']
		}),
		// this method gets a workspace by the id
		getWorkspace: builder.query({
			query: (id) => `/workspace/${id}`,
			providesTags: ['workspace']
		}),
		// this method updates a workspace by the id
		updateWorkspace: builder.mutation({
			query: (params) => {
				return {
					url: `/workspace/${params.id}`,
					method: 'PUT',
					body: params.body
				};
			},
			invalidatesTags: ['workspacesList', 'workspace']
		}),
		// this method deletes a workspace by the id
		deleteWorkspace: builder.mutation({
			query: (params) => {
				const forceDelete = params.forceDelete || false;
				return {
					url: `/workspace/${params.id}`,
					method: 'DELETE',
					body: {
						forceDelete
					}
				};
			},
			invalidatesTags: ['workspacesList']
		})
	})
});

export const {
	useGetWorkspacesListQuery,
	useGetWorkspaceSearchListQuery,
	useCreateWorkspaceMutation,
	useCreateMultipleWorkspacesMutation,
	useGetWorkspaceQuery,
	useUpdateWorkspaceMutation,
	useDeleteWorkspaceMutation
} = workspacesApiSlice;
