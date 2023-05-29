import { Card, CardContent, CardActionArea } from '@mui/material';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import { Duration } from 'luxon';

export default function WorkspaceTypeCard ({ workspaceType, handleWorkspaceTypeSelect }) {
	const duration = Duration.fromObject(workspaceType.maxReservationInterval);
	const intervalString = duration.toFormat('hh:mm');

	return (
		<Card
			sx={{
				position: 'relative',
				maxWidth: '100%',
				minHeight: 200,
				'&::before': {
					content: '""',
					position: 'absolute',
					top: '30%',
					left: '30%',
					right: '30%',
					bottom: '30%',
					backgroundImage: `url(${workspaceType.image})`,
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'center',
					opacity: 0.5
				}
			}}
		>

			<CardActionArea onClick={handleWorkspaceTypeSelect} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', padding: 0 }}>
				<CardContent>
					<Typography sx={{ color: '#454545' }}><strong>{workspaceType.name}</strong></Typography>
				</CardContent>
				<CardContent>
					<Typography sx={{ color: '#454545' }}><strong>Max reservation time: {intervalString}</strong></Typography>
				</CardContent>
			</CardActionArea>

		</Card>
	);
}

WorkspaceTypeCard.propTypes = {
	workspaceType: PropTypes.object,
	handleWorkspaceTypeSelect: PropTypes.func
};
