import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';
import { loginApiSlice } from '../api/loginApiSlice';
import { reservationsApiSlice } from '../api/reservationApiSlice';
import { usersApiSlice } from '../api/usersApiSlice';
import { workspacesApiSlice } from '../api/workspaceApiSlice';
import { workspaceTypesApiSlice } from '../api/workspaceTypeApiSlice';
import { equipmentsApiSlice } from '../api/equipmentApiSlice';
import { areaApiSlice } from '../api/areaApiSlice';
import { locationApiSlice } from '../api/locationApiSlice';

export default configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		[usersApiSlice.reducerPath]: usersApiSlice.reducer,
		[workspacesApiSlice.reducerPath]: workspacesApiSlice.reducer,
		[workspaceTypesApiSlice.reducerPath]: workspaceTypesApiSlice.reducer,
		[reservationsApiSlice.reducerPath]: reservationsApiSlice.reducer,
		[areaApiSlice.reducerPath]: areaApiSlice.reducer,
		[loginApiSlice.reducerPath]: loginApiSlice.reducer,
		[equipmentsApiSlice.reducerPath]: equipmentsApiSlice.reducer,
		[locationApiSlice.reducerPath]: locationApiSlice.reducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(apiSlice.middleware)
			.concat(usersApiSlice.middleware)
			.concat(workspacesApiSlice.middleware)
			.concat(workspaceTypesApiSlice.middleware)
			.concat(reservationsApiSlice.middleware)
			.concat(areaApiSlice.middleware)
			.concat(loginApiSlice.middleware)
			.concat(equipmentsApiSlice.middleware)
			.concat(locationApiSlice.middleware)
});
