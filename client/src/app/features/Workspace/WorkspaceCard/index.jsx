import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as React from 'react';
import { Card, CardContent, CardActionArea } from '@mui/material';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import CreateReservation from '../../Reservation/CreateReservation';

const WorkspaceCard = ({ workspace, handleDrawerOpen, startHour, date, endHour }) => {
	const [open, setOpen] = React.useState(false);

	// get all equipment for one workspace
	const equipmentName = workspace.equipment.map((equipment) => equipment.name);

	// open drawer for reservation
	handleDrawerOpen = () => {
		setOpen(true);
	};

	// close drawer
	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<Card sx={{ maxWidth: 'sm' }}>
			<CardActionArea onClick={handleDrawerOpen}>
				<CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
					<CardContent sx={{ height: 80 }}>
						<Typography variant="h7" gutterBottom>{workspace.name}</Typography>
						<Link to={workspace.id}>
						</Link>
					</CardContent>
					<CardContent sx={{ display: 'grid', justifyContent: 'center', height: 25 }}>
						<Typography fontSize={12} gutterBottom>{`${equipmentName}`}</Typography>
						<Typography fontSize={12} gutterBottom> Area: {workspace.area.name}</Typography>
					</CardContent>
				</CardContent>
			</CardActionArea>
			<Drawer anchor="right" open={open} onClose={handleDrawerClose}>
				<CreateReservation workspaceId={workspace.id} reservationDate={date} startTime={startHour} endTime={endHour} onClose={handleDrawerClose} />
			</Drawer>
		</Card>
	);
};

WorkspaceCard.propTypes = {
	workspace: PropTypes.object,
	handleDrawerOpen: PropTypes.func,
	startHour: PropTypes.string,
	endHour: PropTypes.string,
	date: PropTypes.string
};

export default WorkspaceCard;
