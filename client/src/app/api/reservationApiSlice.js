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
		// this method gets all the reservations
		getReservationsList: builder.query({
			query: () => '/reservation?include=workspace',
			providesTags: ['reservationsList', 'reservation'],
			transformResponse: (response, meta, args) => {
				const pages = Number(meta.response.headers.get('X-Total-Pages'));

				return [response, pages];
			}
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
		// this method gets a reservation by the id
		getReservation: builder.query({
			query: (id) => `/reservation/${id}`,
			providesTags: ['reservation']
		}),
		// this method updates a reservation by the id
		updateReservation: builder.mutation({
			query: ({ id, body }) => {
				console.log(id);
				console.log(body);
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
	useGetReservationsListQuery,
	useCreateReservationMutation,
	useGetReservationQuery,
	useUpdateReservationMutation,
	useDeleteReservationMutation
} = reservationsApiSlice;
