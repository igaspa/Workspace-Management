import BackofficeDashboard from '../pages/BackofficeDashboard';
import WorkspaceCreation from '../pages/Workspace/createWorkspaces';
import WorkspaceList from '../features/Workspace/WorkspaceTable';
import UserList from '../features/Users/UserTable';
import EquipmentList from '../pages/Equipment';
import WorkspaceTypeList from '../pages/WorkspaceType';
import CreateWorkspaceTypePage from '../pages/CreateWorkspaceType';
import CreateEquipmentPage from '../pages/CreateEquipment';
import LocationList from '../pages/Location';
import CreateLocationPage from '../pages/CreateLocation';
import AreaTable from '../pages/Area';
import CreateArea from '../pages/CreateArea';
import CreateUserPage from '../pages/CreateUser';
import ReinviteUserPage from '../pages/ReinviteUser';
import { Navigate } from 'react-router-dom';

const withAuthentication = (Component) => {
  const role = localStorage.getItem('role');
  const isAuthenticated = role.includes('Administrator') ? true : false;
  return (props) => {
    if (isAuthenticated) {
      return <Component {...props} />;
    } else {
      return <Navigate to="/" />;
    }
  };
};

export const GuardedBackofficeDashboard = withAuthentication(BackofficeDashboard);
export const GuardedWorkspaceList = withAuthentication(WorkspaceList);
export const GuardedUserList = withAuthentication(UserList);
export const GuardedUserCreation = withAuthentication(CreateUserPage);
export const GuardedUserReinvite = withAuthentication(ReinviteUserPage);
export const GuardedWorkspaceCreation = withAuthentication(WorkspaceCreation);
export const GuardedEquipmentList = withAuthentication(EquipmentList);
export const GuardedEquipmentCreation = withAuthentication(CreateEquipmentPage);
export const GuardedWorkspaceTypeList = withAuthentication(WorkspaceTypeList);
export const GuardedWorkspaceTypeCreation = withAuthentication(CreateWorkspaceTypePage);
export const GuardedLocationList = withAuthentication(LocationList);
export const GuardedLocationCreation = withAuthentication(CreateLocationPage);
export const GuardedAreaList = withAuthentication(AreaTable);
export const GuardedAreaCreation = withAuthentication(CreateArea);
