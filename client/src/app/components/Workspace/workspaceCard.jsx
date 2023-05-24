import PropTypes from 'prop-types';
import { Card, CardContent, CardActionArea, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import CreateReservation from '../../features/Reservation/CreateReservation';
import CreatePermanentReservation from '../../features/Reservation/PermanentReservations';
import CreateMultipleReservation from '../../features/Reservation/MultipleReservation';

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
	const role = localStorage.getItem('role');

	return (
		<>
			<Card
				sx={{
					position: 'relative',
					maxWidth: '100%',
					minHeight: 250,
					'&::before': {
						content: '""',
						position: 'absolute',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						backgroundImage: `url(${image})`,
						backgroundSize: 'cover',
						backgroundPosition: 'center',
						opacity: 0.12,
						maxWidth: 'sm'
					}
				}}
			>

				<CardActionArea
					onClick={() => {
						(role.includes('Administrator') || role.includes('Lead'))
							? handleMultipleDrawerOpen()
							: handleDrawerOpen();
					}}
					style={{ height: '100%' }}
				>
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

						{role.includes('Administrator') && workspace.workspaceType.allowPermanentReservations && (
							<div style={{ marginTop: 'auto' }}>
								<CardContent style={{ display: 'grid', padding: 0, margin: 0 }}>
									<Button
										style={{ padding: 0, margin: 0 }}
										onClick={(event) => {
											event.stopPropagation();
											handlePermanentDrawerOpen();
										}}
									>
								Permanent Reservation
									</Button>
								</CardContent>
							</div>
						)}
					</CardContent>
				</CardActionArea>

				<Drawer anchor="right" open={open} onClose={handleDrawerClose}>
					<CreateReservation
						workspace={workspace}
						reservationDate={fromDate}
						startTime={startHour}
						endTime={endHour}
						onClose={handleDrawerClose}
					/>
				</Drawer>

				<Drawer anchor="right" open={openMultiple} onClose={handleDrawerClose}>
					<CreateMultipleReservation
						workspace={workspace}
						reservationFromDate={fromDate}
						reservationUntilDate={untilDate}
						startTime={startHour}
						endTime={endHour}
						onClose={handleDrawerClose}
					/>
				</Drawer>

				<Drawer anchor="right" open={openPermanent} onClose={handleDrawerClose}>
					<CreatePermanentReservation
						workspace={workspace}
						reservationDate={fromDate}
						startTime={startHour}
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
