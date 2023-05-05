
import { Card, CardContent } from '@mui/material';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';

export default function ActiveReservationCard ({ reservation }) {
	return (
		<Card sx={{ maxWidth: 120 }}>

			<CardContent >
				<Typography sx={{ paddingTop: 2 }} fontSize={14} gutterBottom>{reservation.dateTime}</Typography>
			</CardContent>
		</Card>
	);
}

ActiveReservationCard.propTypes = {
	reservation: PropTypes.object
};
