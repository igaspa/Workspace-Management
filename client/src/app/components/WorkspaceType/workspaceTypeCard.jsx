import { Card, CardContent, CardActionArea } from '@mui/material';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';

export default function WorkspaceTypeCard ({ workspaceType, handleWorkspaceTypeSelect }) {
	return (
		<Card sx={{ maxWidth: 400 }}>
			<CardActionArea onClick={handleWorkspaceTypeSelect}>
				<CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
					<CardContent sx={{ height: 50 }}>
						<Typography variant="h7" gutterBottom>{workspaceType.name}</Typography>
					</CardContent>
					<CardContent spacing={1}>
					</CardContent>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}

WorkspaceTypeCard.propTypes = {
	workspaceType: PropTypes.object,
	handleWorkspaceTypeSelect: PropTypes.func
};
