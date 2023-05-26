import PropTypes from 'prop-types';
import { Card, CardContent, CardActionArea } from '@mui/material';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import CreateReservation from '../../features/Reservation/CreateReservation';

const WorkspaceCard = ({
	workspace,
	image,
	handleDrawerOpen,
	handlePermanentDrawerOpen,
	handleMultipleDrawerOpen,
	startHour,
	endHour,
	handleDrawerClose,
	open,
	openPermanent,
	openMultiple,
	fromDate,
	untilDate
}) => {
	const equipmentName = workspace.equipment.map((equipment) => equipment.name);
	return (
		<>
			<Card
				sx={{
					position: 'relative',
					maxWidth: '100%',
					minHeight: 200,
					'&::before': {
						content: '""',
						position: 'absolute',
						top: '20%',
						left: '20%',
						right: '20%',
						bottom: '20%',
						backgroundImage: `url(${image})`,
						backgroundRepeat: 'no-repeat',
						backgroundPosition: 'center',
						opacity: 0.06
					}

				}}
			>

				<CardActionArea onClick={handleDrawerOpen} style={{ height: '100%' }}>
					<CardContent style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
						<CardContent>
							<Typography variant="h7">
								{workspace.name}
							</Typography>
						</CardContent>

						<CardContent style={{ display: 'grid', justifyContent: 'center' }}>
							<Typography fontSize={14}>{`${equipmentName}`}</Typography>
							<Typography fontSize={14}>Area: {workspace.area.name}</Typography>
						</CardContent>

					</CardContent>
				</CardActionArea>

				<Drawer anchor="right" open={open} onClose={handleDrawerClose}>
					<CreateReservation
						workspace={workspace}
						reservationFromDate={fromDate}
						reservationUntilDate={untilDate}
						startTime={startHour}
						endTime={endHour}
						onClose={handleDrawerClose}
					/>
				</Drawer>

			</Card>
		</>
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
	image: PropTypes.string,
	handlePermanentDrawerOpen: PropTypes.func,
	handleMultipleDrawerOpen: PropTypes.func
};

export default WorkspaceCard;
