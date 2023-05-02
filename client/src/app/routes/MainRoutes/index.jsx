import MainLayout from '../../layout/MainLayout';

// render - dashboard
import DashboardDefault from '../../pages/dashboard';
import Users from '../../pages/Users';
import User from '../../pages/User';
import Reservation from '../../features/Reservation/CreateReservation';
import Reservations from '../../features/Reservation/ReservationList';

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
	path: '/',
	element: <MainLayout />,
	children: [
		{
			path: '/',
			element: <DashboardDefault />
		},
		{
			path: '/users',
			element: <Users />
		},
		{
			path: '/reservations',
			element: <Reservations />
		},
		{
			path: '/users/:userId',
			element: <User />,
			exact: true
		},
		{
			path: '/reservations/:workspaceId',
			element: <Reservation />,
			exact: true
		},
		{
			path: '*',
			element: <DashboardDefault />
		}
	]
};

export default MainRoutes;
