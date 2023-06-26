import BackofficeLayout from '../../layout/BackofficeLayout';
import {
  GuardedBackofficeDashboard,
  GuardedWorkspaceList,
  GuardedUserList,
  GuardedUserCreation,
  GuardedUserReinvite,
  GuardedWorkspaceCreation,
  GuardedEquipmentList,
  GuardedEquipmentCreation,
  GuardedWorkspaceTypeList,
  GuardedWorkspaceTypeCreation,
  GuardedLocationList,
  GuardedLocationCreation,
  GuardedAreaList,
  GuardedAreaCreation
} from '../../utils/routeGuard';

// ==============================|| MAIN ROUTING ||============================== //
const BackofficeRoutes = {
  path: '/backoffice',
  element: <BackofficeLayout />,
  children: [
    {
      path: '/backoffice',
      element: <GuardedBackofficeDashboard />
    },
    {
      path: '/backoffice/workspaces',
      element: <GuardedWorkspaceList />
    },
    {
      path: '/backoffice/users',
      element: <GuardedUserList />
    },
    {
      path: '/backoffice/user/invite',
      element: <GuardedUserCreation />
    },
    {
      path: '/backoffice/user/reinvite',
      element: <GuardedUserReinvite />
    },
    {
      path: '/backoffice/create-workspace',
      element: <GuardedWorkspaceCreation />
    },
    {
      path: '/backoffice/equipment',
      element: <GuardedEquipmentList />
    },
    {
      path: '/backoffice/create-equipment',
      element: <GuardedEquipmentCreation />
    },
    {
      path: '/backoffice/workspace-type',
      element: <GuardedWorkspaceTypeList />
    },
    {
      path: '/backoffice/create-workspace-type',
      element: <GuardedWorkspaceTypeCreation />
    },
    {
      path: '/backoffice/location',
      element: <GuardedLocationList />
    },
    {
      path: '/backoffice/create-location',
      element: <GuardedLocationCreation />
    },
    {
      path: '/backoffice/area',
      element: <GuardedAreaList />
    },
    {
      path: '/backoffice/create-area',
      element: <GuardedAreaCreation />
    }
  ]
};

export default BackofficeRoutes;
