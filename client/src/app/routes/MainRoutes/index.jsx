import MainLayout from '../../layout/MainLayout';

// render - dashboard
import DashboardDefault from '../../pages/dashboard';
import Users from '../../pages/Users';
import User from '../../pages/User';
import ReservationList from '../../pages/Reservations';
import WorkspaceReservations from '../../pages/Workspace/workspaceReservations';
import CreatePasswordPage from '../../pages/CreatePassword';
import PasswordResetPage from '../../pages/PasswordReset';
import NotFound from '../../pages/404';
import ServerError from '../../pages/ServerError';

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
      path: '/user/password-create',
      element: <CreatePasswordPage />
    },
    {
      path: '/users/password-reset',
      element: <PasswordResetPage />
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
      path: '/workspace/:workspaceId/:workspaceName',
      element: <WorkspaceReservations />,
      exact: true
    },
    {
      path: '/404',
      element: <NotFound />,
      exact: true
    },
    {
      path: '/server-error',
      element: <ServerError />,
      exact: true
    },
    {
      path: '*',
      element: <DashboardDefault />
    }
  ]
};

export default MainRoutes;
