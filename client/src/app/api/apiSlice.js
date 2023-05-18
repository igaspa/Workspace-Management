import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
	baseUrl: import.meta.env.VITE_SERVER_API_URL,
	prepareHeaders: (headers, { getState }) => {
		const token = localStorage.getItem('token');
		if (token) {
			headers.set('Authorization', `Bearer ${token}`);
		}
		return headers;
	}
});

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery,
	tagTypes: ['MyAPI'],
	endpoints: (builder) => ({
		// ...
	})
});

// ...
