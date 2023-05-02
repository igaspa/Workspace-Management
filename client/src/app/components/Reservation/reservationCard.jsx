import { Card, CardContent, Button, Box } from '@mui/material';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';

export default function ReservationCard ({ reservation, handleDeleteClick, handleUpdateClick }) {
	return (
		<Card sx={{ maxWidth: 200 }}>
			<CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
				<CardContent sx={{ height: 50 }}>
					<Typography variant="h7" gutterBottom>{reservation.workspace.name}</Typography>
				</CardContent>
				<CardContent >
					<Typography sx={{ paddingTop: 2 }}fontSize={12} gutterBottom>{reservation.dateTime}</Typography>
				</CardContent>
				<CardContent spacing={1}>
					<Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
						<Button size="small" color="primary" onClick={handleUpdateClick}>
        Update
						</Button>
						<Button size="small" color="primary" onClick={handleDeleteClick}>
        Delete
						</Button>
					</Box>
				</CardContent>
			</CardContent>
		</Card>
	);
}

ReservationCard.propTypes = {
	reservation: PropTypes.object,
	handleDeleteClick: PropTypes.func,
	handleUpdateClick: PropTypes.func
};
