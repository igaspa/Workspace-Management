import Dashboard from '../../features/Dashboard';
import TabletDashboard from '../../features/TabletDashboard';
import { ROLES } from '../../utils/constants';

export default function MainPage() {
  const role = localStorage.getItem('role');
  const isTablet = role?.length && role.includes(ROLES.TABLET);

  return isTablet ? <TabletDashboard /> : <Dashboard />;
}
