import { useState, useRef } from 'react';
import { useDeleteReservationMutation, useGetUsersReservationListQuery } from '../../../api/reservationApiSlice';
import { CircularProgress, Typography, Grid, Box } from '@mui/material';
import ReservationCard from '../../../components/Reservation/reservationCard';
import UpdateReservation from '../UpdateReservation';
import Drawer from '@mui/material/Drawer';
import { successToast, errorToast } from '../../../utils/toastifyNotification';
import { BasicPagination } from '../../../components/Pagination/pagination';
import { DateTime } from 'luxon';

const Reservations = () => {
	const [deleteReservation] = useDeleteReservationMutation();
	const [open, setOpen] = useState(false);
	const divRef = useRef();
	const [page, setPage] = useState(1);
	const [selectedReservation, setSelectedReservation] = useState({});

	const [fromDate, setFromDate] = useState('');
	const [untilDate, setUntilDate] = useState('');

	const [startHour, setStartHour] = useState('');
	const [endHour, setEndHour] = useState('');

	const handleDrawerOpen = (_event, reservation) => {
		setSelectedReservation(reservation);

		const startDate = DateTime.fromISO(reservation.startAt, { zone: 'local' });
		const endDate = DateTime.fromISO(reservation.endAt, { zone: 'local' });

		setFromDate(startDate.toISO().slice(0, 10));
		setUntilDate(endDate.toISO().slice(0, 10));

		setStartHour(startDate.toISO().slice(11, 16));
		setEndHour(endDate.toISO().slice(11, 16));

		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
		setSelectedReservation({});
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

	const { data: [reservationData, pages] = [], isError, isLoading } = useGetUsersReservationListQuery();

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
										<UpdateReservation startDate={fromDate} endDate={untilDate} startHour={startHour} endHour={endHour} reservation={selectedReservation} onClose={handleDrawerClose} />
									</Drawer>
								</Grid>
								{(reservationData.length)
									? <BasicPagination count={pages} page={page} onChange={handlePageChange} />
									: "You don't have any reservations."
								}
							</Box>
						</main>)}

		</div>
	);
};

export default Reservations;
