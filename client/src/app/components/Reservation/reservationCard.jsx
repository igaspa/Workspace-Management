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
		<Card>
			<CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

				<CardContent sx={{ height: 50 }}>
					<Typography variant="h7" gutterBottom>{reservation.workspace.name}</Typography>
				</CardContent>

				<CardContent >
					<Typography sx={{ paddingTop: 2 }} fontSize={12} gutterBottom>{reservation.dateTime}</Typography>
				</CardContent>

				<CardContent spacing={1}>
					<Button size="small" color="primary" onClick={handleUpdateClick} disabled={new Date(reservation.startAt) < new Date()}>
							Update
					</Button>
					<Button size="small" color="primary" onClick={handleOpen}>
							Delete
					</Button>

					<Dialog open={open} onClose={handleClose}>
						<DialogTitle>Delete Reservation</DialogTitle>
						<DialogContent>
							<DialogContentText>
							Are you sure you want to delete this reservation?
							</DialogContentText>
						</DialogContent>
						<DialogActions>
							<Button onClick={handleDeleteClick} autoFocus>Delete</Button>
							<Button onClick={handleClose}>Cancel</Button>
						</DialogActions>
					</Dialog>

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
