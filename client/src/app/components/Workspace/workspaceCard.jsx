import PropTypes from 'prop-types';
import { Card, CardContent, CardActionArea } from '@mui/material';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import CreateReservation from '../../features/Reservation/CreateReservation';

const WorkspaceCard = ({
	workspace,
	image,
	handleDrawerOpen,
	startHour,
	endHour,
	handleDrawerClose,
	open,
	fromDate,
	untilDate
}) => {
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

				<CardActionArea onClick={handleDrawerOpen} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', padding: 0 }}>

					<CardContent>
						<Typography variant="h7">
							{workspace.name}
						</Typography>
					</CardContent>

					<CardContent style={{ display: 'grid', justifyContent: 'center' }}>
						{workspace.equipment.map((equipment) => (
							<Typography fontSize={14} key={equipment.name}>
								{`${equipment.name} - ${equipment.workspaceEquipment.quantity}`}
							</Typography>
						))}
						<Typography fontSize={14}>Area: {workspace.area.name}</Typography>
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
	image: PropTypes.string
};

export default WorkspaceCard;
