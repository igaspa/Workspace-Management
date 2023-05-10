import BackofficeLayout from '../../layout/BackofficeLayout';

// render - dashboard
import BackofficeDashboard from '../../pages/BackofficeDashboard';

// ==============================|| MAIN ROUTING ||============================== //
const BackofficeRoutes = {
	path: '/backoffice',
	element: <BackofficeLayout />,
	children: [
		{
			path: '/backoffice',
			element: <BackofficeDashboard />
		}
	]
};

export default BackofficeRoutes;
