import { useState } from 'react';
import { Card, CardContent, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';

export default function ReservationCard ({ reservation, handleDeleteClick, handleUpdateClick }) {
	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<Card
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					height: '100%'
				}}
			>

				<CardContent>
					<Typography variant="h7" gutterBottom>{reservation.workspace.name}</Typography>
				</CardContent>

				<CardContent>
					<Typography sx={{ paddingTop: 2 }} fontSize={12} gutterBottom>{reservation.dateTime}</Typography>
				</CardContent>

				<CardContent spacing={1}>
					<Button
						size="small"
						color="primary"
						onClick={handleUpdateClick}
						disabled={(new Date(reservation.startAt) < new Date()) || !reservation.endAt}
					>
						Update
					</Button>

					<Button size="small" color="primary" onClick={handleOpen}>
						Cancel
					</Button>
				</CardContent>

			</Card>

			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Cancel Reservation</DialogTitle>
				<DialogContent>
					<DialogContentText>
							Are you sure you want to cancel this reservation?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleDeleteClick} autoFocus>Confirm</Button>
					<Button onClick={handleClose}>Cancel</Button>
				</DialogActions>
			</Dialog>
		</>

	);
}

ReservationCard.propTypes = {
	reservation: PropTypes.object,
	handleDeleteClick: PropTypes.func,
	handleUpdateClick: PropTypes.func
};
