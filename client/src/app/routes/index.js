import { useRoutes } from 'react-router-dom';

// project import
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';
import BackofficeRoutes from './BackofficeRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes () {
	return useRoutes([MainRoutes, LoginRoutes, BackofficeRoutes]);
}
