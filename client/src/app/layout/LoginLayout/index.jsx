import React from 'react';
import { Outlet } from 'react-router-dom';

const LoginLayout = () => {
	return (
		<>
			<h2>Agilathon</h2>
			<Outlet />
		</>
	);
};

export default LoginLayout;
