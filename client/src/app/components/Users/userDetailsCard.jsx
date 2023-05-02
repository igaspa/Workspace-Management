import * as React from 'react';
import { Card, CardHeader, CardContent, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const UserDetailsCard = ({ user }) => {
	return (
		<Card >
			<CardHeader title={`${user.firstName} ${user.lastName}`} />
			<CardContent spacing={1}>
				<Typography>Email: {user.email}</Typography>
				<Typography>Phone: {user.phoneNumber}</Typography>
			</CardContent>
		</Card>
	);
};

UserDetailsCard.propTypes = {
	user: PropTypes.object
};

export default UserDetailsCard;
