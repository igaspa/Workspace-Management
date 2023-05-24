import { useState } from 'react';
import { Card, CardContent, CardActionArea } from '@mui/material';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import { Duration } from 'luxon';

export default function WorkspaceTypeCard ({ workspaceType, handleWorkspaceTypeSelect }) {
	const [imageLoaded, setImageLoaded] = useState(false);

	const handleImageLoad = () => {
		setImageLoaded(true);
	};

	const duration = Duration.fromObject(workspaceType.maxReservationInterval);
	const intervalString = duration.toFormat('hh:mm');

	return (
		<>
			<img src={workspaceType.image} onLoad={handleImageLoad} style={{ display: 'none' }} alt={workspaceType.name} />
			{imageLoaded && (
				<Card
					sx={{
						position: 'relative',
						width: 200,
						height: 200,
						'&::before': {
							content: '""',
							position: 'absolute',
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							backgroundImage: `url(${workspaceType.image})`,
							backgroundSize: 'cover',
							backgroundPosition: 'center center',
							opacity: 0.22,
							maxWidth: '100%'
						}
					}}
				>

					<CardActionArea onClick={handleWorkspaceTypeSelect} sx={{ width: '100%', height: '100%' }}>
						<CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
							<CardContent style={{ height: '80px' }}>
								<Typography sx={{ color: '#454545' }}><strong>{workspaceType.name}</strong></Typography>
							</CardContent>
							<CardContent spacing={1} sx={{ mt: 3 }}>
								<Typography sx={{ color: '#454545' }}><strong>Max reservation time: {intervalString}</strong></Typography>
							</CardContent>
						</CardContent>
					</CardActionArea>
				</Card>
			)}
		</>
	);
}

WorkspaceTypeCard.propTypes = {
	workspaceType: PropTypes.object,
	handleWorkspaceTypeSelect: PropTypes.func
};
