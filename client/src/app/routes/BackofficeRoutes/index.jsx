import BackofficeLayout from '../../layout/BackofficeLayout';

// render - dashboard
import BackofficeDashboard from '../../pages/BackofficeDashboard';
import MultipleWorkspacesCreation from '../../pages/Workspace/createCollection';
import WorkspaceCreation from '../../pages/Workspace/createOneWorkspace';
import WorkspaceList from '../../pages/Workspace/workspaceList';
import EquipmentList from '../../pages/Equipment';
import WorkspaceTypeList from '../../pages/WorkspaceType';
import CreateWorkspaceTypePage from '../../pages/CreateWorkspaceType';
import CreateEquipmentPage from '../../pages/CreateEquipment';
import AreaList from '../../pages/Area';
import LocationList from '../../pages/Location';
import CreateLocationPage from '../../pages/CreateLocation';

// ==============================|| MAIN ROUTING ||============================== //
const BackofficeRoutes = {
	path: '/backoffice',
	element: <BackofficeLayout />,
	children: [
		{
			path: '/backoffice',
			element: <BackofficeDashboard />
		},
		{
			path: '/backoffice/workspaces',
			element: <WorkspaceList />
		},
		{
			path: '/backoffice/workspace',
			element: <WorkspaceCreation />
		},
		{
			path: '/backoffice/workspace/collection',
			element: <MultipleWorkspacesCreation />
		},
		{
			path: '/backoffice/equipment',
			element: <EquipmentList />
		},
		{
			path: '/backoffice/create-equipment',
			element: <CreateEquipmentPage />
		},
		{
			path: '/backoffice/workspace-type',
			element: <WorkspaceTypeList />
		},
		{
			path: '/backoffice/create-workspace-type',
			element: <CreateWorkspaceTypePage />
		},
		{
			path: '/backoffice/area',
			element: <AreaList />
		},
		{
			path: '/backoffice/location',
			element: <LocationList />
		},
		{
			path: '/backoffice/create-location',
			element: <CreateLocationPage />
		}
	]
};

export default BackofficeRoutes;
