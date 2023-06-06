import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const equipmentsApiSlice = createApi({
	reducerPath: 'equipmentApi',
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
	tagTypes: ['equipmentsList', 'equipment'],
	endpoints: (builder) => ({
		// this method gets all the equipments
		getEquipmentsList: builder.query({
			query: (params) => {
				const queryParameters = {
					page: params.page,
					size: params.size
				};

				return {
					url: '/equipment',
					method: 'GET',
					params: queryParameters
				};
			},
			providesTags: ['equipmentsList'],
			transformResponse: (response, meta, args) => {
				const pages = Number(meta.response.headers.get('X-Total-Pages'));

				return [response, pages];
			},
			invalidatesTags: ['equipmentsList']
		}),
		getEquipmentSearchList: builder.query({
			query: (params) => {
				const queryParameters = {
					name: params.name,
					size: params.size,
					page: params.page
				};

				return {
					url: '/equipment',
					method: 'GET',
					params: queryParameters
				};
			},
			providesTags: ['equipmentsList'],
			transformResponse: (response, meta, args) => {
				const pages = Number(meta.response.headers.get('X-Total-Pages'));

				return [response, pages];
			},
			invalidatesTags: ['equipmentsList']
		}),
		// this method creates a new equipment
		createEquipment: builder.mutation({
			query: (body) => ({
				url: '/equipment',
				method: 'POST',
				body
			}),
			invalidatesTags: ['equipmentsList']
		}),
		// this method gets a equipment by the id
		getEquipment: builder.query({
			query: (id) => `/equipment/${id}`,
			providesTags: ['equipment']
		}),
		// this method updates a equipment by the id
		updateEquipment: builder.mutation({
			query: ({ id, body }) => ({
				url: `/equipment/${id}`,
				method: 'PUT',
				body
			}),
			invalidatesTags: ['equipmentsList', 'equipment']
		}),
		// this method deletes a equipment by the id
		deleteEquipment: builder.mutation({
			query: (id) => ({
				url: `/equipment/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['equipmentsList']
		})
	})
});

export const {
	useGetEquipmentsListQuery,
	useGetEquipmentSearchListQuery,
	useCreateEquipmentMutation,
	useGetEquipmentQuery,
	useUpdateEquipmentMutation,
	useDeleteEquipmentMutation
} = equipmentsApiSlice;
