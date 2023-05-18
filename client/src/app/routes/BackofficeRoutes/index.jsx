import BackofficeLayout from '../../layout/BackofficeLayout';

// render - dashboard
import BackofficeDashboard from '../../pages/BackofficeDashboard';
import WorkspaceCreation from '../../pages/Workspace/createWorkspaces';
import WorkspaceList from '../../features/Workspace/WorkspaceTable';
import EquipmentList from '../../pages/Equipment';
import WorkspaceTypeList from '../../pages/WorkspaceType';
import CreateWorkspaceTypePage from '../../pages/CreateWorkspaceType';
import CreateEquipmentPage from '../../pages/CreateEquipment';
import LocationList from '../../pages/Location';
import CreateLocationPage from '../../pages/CreateLocation';
import AreaTable from '../../features/Area/AreaTable';
import CreateArea from '../../features/Area/CreateArea';

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
			path: '/backoffice/create-workspace',
			element: <WorkspaceCreation />
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
			path: '/backoffice/location',
			element: <LocationList />
		},
		{
			path: '/backoffice/create-location',
			element: <CreateLocationPage />
		},
		{
			path: '/backoffice/area',
			element: <AreaTable />
		},
		{
			path: '/backoffice/create-area',
			element: < CreateArea/>
		}
	]
};

export default BackofficeRoutes;
