import { useState, useRef } from 'react';
import { useGetReservationsListQuery, useDeleteReservationMutation } from '../../../api/reservationApiSlice';
import { CircularProgress, Typography, Grid, Box } from '@mui/material';
import ReservationCard from '../../../components/Reservation/reservationCard';
import UpdateReservation from '../UpdateReservation';
import Drawer from '@mui/material/Drawer';
import { successToast, errorToast } from '../../../utils/toastifyNotification';
import { BasicPagination } from '../../../components/Pagination/pagination';

const Reservations = () => {
	const { data: [reservationData, pages] = [], isError, isLoading } = useGetReservationsListQuery();
	const [deleteReservation] = useDeleteReservationMutation();
	const [open, setOpen] = useState(false);
	const [selectedId, setSelectedId] = useState(' ');
	const divRef = useRef();
	const [page, setPage] = useState(1);

	const handleDrawerOpen = (_event, reservation) => {
		setSelectedId(reservation.id);
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const handlePageChange = async (event, value) => {
		setPage(value);
	};

	const handleDeleteClick = async (event, reservation) => {
		event.preventDefault();
		await deleteReservation(reservation.id)
			.unwrap()
			.then((response) => {
				successToast(response.message);
			})
			.catch((error) => {
				errorToast(error.data.details);
			});
	};

	return (
		<div >
			{isLoading
				? (
					<CircularProgress />
				)
				: isError
					? (
						<Typography color="error">Failed to load reservations.</Typography>
					)
					: (
						<main>
							<Box spacing={2} direction="row" flexWrap="wrap" margin={0}>
								<Grid ref={divRef} sx={{ display: 'grid', rowGap: 1, columnGap: 1, gridTemplateColumns: 'repeat(5, 1fr)', paddingBottom: 2 }}>
									{reservationData.map((reservation) => (
										<ReservationCard key={reservation.id} reservation={reservation}
											handleUpdateClick={(event) => handleDrawerOpen(event, reservation)}
											handleDeleteClick={(event) => handleDeleteClick(event, reservation)}
										/>
									))}
									<Drawer anchor="right" open={open} onClose={handleDrawerClose}>
										<UpdateReservation reservationId={selectedId} onClose={handleDrawerClose} />
									</Drawer>
								</Grid>
								{(reservationData.length)
									? <BasicPagination count={pages} page={page} onChange={handlePageChange} />
									: "You don't have any reservaitons"
								}
							</Box>
						</main>)}

		</div>
	);
};

export default Reservations;
