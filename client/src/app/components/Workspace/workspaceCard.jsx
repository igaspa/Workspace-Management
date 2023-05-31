import PropTypes from 'prop-types';
import { Card, CardContent, CardActionArea } from '@mui/material';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import CreateReservation from '../../features/Reservation/CreateReservation';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

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
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	return (
		<>
			<Card
				sx={{
					position: 'relative',
					maxWidth: '100%',
					minHeight: 200,
					height: '100%',
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

					<CardContent>
						{workspace.equipment.map((equipment) => (
							<Typography fontSize={14} key={equipment.name}>
								{`${equipment.name} - ${equipment.workspaceEquipment.quantity}`}
							</Typography>
						))}
						<Typography style={{ paddingTop: 10 }} fontSize={14}>Area: {workspace.area.name}</Typography>
					</CardContent>

				</CardActionArea>

				<Drawer
					anchor="right"
					open={open}
					onClose={handleDrawerClose}
					PaperProps={{
						sx: {
							maxWidth: isMobile ? '90%' : '450px',
							display: 'flex',
							flexDirection: 'column'
						}
					}}
				>
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
