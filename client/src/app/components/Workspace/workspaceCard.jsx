import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card, CardContent, CardActionArea, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import CreateReservation from '../../features/Reservation/CreateReservation';
import CreatePermanentReservation from '../../features/Reservation/PermanentReservations';
import CreateMultipleReservation from '../../features/Reservation/MultipleReservation';

const WorkspaceCard = ({ workspace, handleDrawerOpen, handlePermanentDrawerOpen, handleMultipleDrawerOpen, startHour, endHour, handleDrawerClose, open, openPermanent, openMultiple, fromDate, untilDate }) => {
	const equipmentName = workspace.equipment.map((equipment) => equipment.name);
	const role = localStorage.getItem('role');
	return (
		<Card sx={{ maxWidth: 'sm' }}>
			<CardActionArea onClick = { () => { (role.includes('Administrator') || role.includes('Lead')) ? handleMultipleDrawerOpen() : handleDrawerOpen(); } } >
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
				<CreateReservation workspace={workspace} reservationDate={fromDate} startTime={startHour} endTime={endHour} onClose={handleDrawerClose} />
			</Drawer>
			<Drawer anchor="right" open={openMultiple} onClose={handleDrawerClose}>
				<CreateMultipleReservation workspaceId={workspace.id} reservationFromDate={fromDate} reservationUntilDate={untilDate} startTime={startHour} endTime={endHour} onClose={handleDrawerClose} />
			</Drawer>

			{(role.includes('Administrator') && (workspace.workspaceType.allowPermanentReservations))
				? <div> <CardContent>
					<Button onClick={handlePermanentDrawerOpen}>Permanent Reservation</Button>
				</CardContent>
				<Drawer anchor="right" open={openPermanent} onClose={handleDrawerClose}>
					<CreatePermanentReservation workspaceId={workspace.id} reservationDate={fromDate} startTime={startHour} onClose={handleDrawerClose} />
				</Drawer>
				</div>
				: null}
		</Card>
	);
};

WorkspaceCard.propTypes = {
	workspace: PropTypes.object,
	handleDrawerOpen: PropTypes.func,
	handleDrawerClose: PropTypes.func,
	startHour: PropTypes.string,
	endHour: PropTypes.string,
	fromDate: PropTypes.string,
	untilDate: PropTypes.string,
	open: PropTypes.bool,
	openPermanent: PropTypes.bool,
	openMultiple: PropTypes.bool,
	handlePermanentDrawerOpen: PropTypes.func,
	handleMultipleDrawerOpen: PropTypes.func
};

export default WorkspaceCard;
