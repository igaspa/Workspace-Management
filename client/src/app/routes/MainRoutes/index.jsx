import MainLayout from '../../layout/MainLayout';

// render - dashboard
import DashboardDefault from '../../pages/dashboard';
import Users from '../../pages/Users';
import User from '../../pages/User';
import ReservationList from '../../pages/Reservations';

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
			element: <ReservationList />
		},
		{
			path: '/users/:userId',
			element: <User />,
			exact: true
		},
		{
			path: '*',
			element: <DashboardDefault />
		}
	]
};

export default MainRoutes;
