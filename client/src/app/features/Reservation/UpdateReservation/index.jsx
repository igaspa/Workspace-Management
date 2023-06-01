import { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import { CircularProgress, Container, Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { getNext7Days, getHours } from '../../../utils/helper';
import CssBaseline from '@mui/material/CssBaseline';
import { useGetReservationsFromWorkspaceQuery, useUpdateReservationMutation } from '../../../api/reservationApiSlice';
import { successToast } from '../../../utils/toastifyNotification';
import { errorHandler } from '../../../utils/errors';
import { useGetUsersListQuery } from '../../../api/usersApiSlice';
import { useNavigate } from 'react-router-dom';
import ActiveReservationCard from '../../../components/Reservation/workspaceReservations';
import { BasicPagination } from '../../../components/Pagination/pagination';
import { Stack } from '@mui/system';
import StandardReservationForm from '../../../components/Reservation/ReservationForms/standardReservationForm';
import PrivilegeReservationForm from '../../../components/Reservation/ReservationForms/privilegeReservationForm';
import ReservationFormFooter from '../../../components/Reservation/ReservationForms/formFooter';

export default function UpdateReservation ({ startDate, endDate, startHour, endHour, reservation, onClose }) {
	const navigate = useNavigate();
	const [updateReservation] = useUpdateReservationMutation();
	const divRef = useRef();

	let setEndHour, setStartHour, setStartDate, setEndDate;
	[startDate, setStartDate] = useState(startDate);
	[endDate, setEndDate] = useState(endDate);

	[startHour, setStartHour] = useState(startHour);
	[endHour, setEndHour] = useState(endHour);

	const [startAt, setStartAt] = useState('');
	const [endAt, setEndAt] = useState('');

	const [selectedUsers, setSelectedUsers] = useState(reservation.participants || []);
	const [participantEmailSlice, setParticipantEmailSlice] = useState('');

	const startHours = getHours(startDate);
	const endHours = getHours(endDate || startDate);

	const dates = getNext7Days();

	const role = localStorage.getItem('role');

	const [page, setPage] = useState(1);

	const handleParticipantChange = (event, value) => {
		setSelectedUsers(value);
	};

	const handleEmailInputChange = (e) => {
		const email = e.target.value;
		if (e.target.value.length > 2) setParticipantEmailSlice(email.slice(0, 3));
	};

	const handleStartDateChange = (event) => {
		setStartDate(event.target.value);
		if (new Date(event.target.value) > new Date(endDate)) setEndDate(event.target.value);
	};

	const handleEndDateChange = (event) => {
		setEndDate(event.target.value);
		if (new Date(event.target.value) < new Date(startDate)) setStartDate(event.target.value);
	};

	const handlePageChange = async (event, value) => {
		setPage(value);
	};

	// get selected start hour
	const handleStartHourChange = (event) => {
		setStartHour(event.target.value);
	};

	// get selected end hour
	const handleEndHourChange = (event) => {
		setEndHour(event.target.value);
	};

	// set startAt value
	useEffect(() => {
		if (startDate && startHour) {
			setStartAt(`${startDate}T${startHour}`);
		}
	}, [startDate, startHour, startAt]);

	// set endAt value
	useEffect(() => {
		if (role.includes('Administrator') || role.includes('Lead')) {
			if (endDate && endHour) setEndAt(`${endDate}T${endHour}`);
		} else if (startDate && endHour) setEndAt(`${startDate}T${endHour}`);
	}, [endDate, endHour, startDate, startHour]);

	const handleSubmit = async (event) => {
		event.preventDefault();

		const participants = selectedUsers.map(user => {
			return {
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email
			};
		});
		const objectToPost = {
			startAt,
			endAt,
			participants
		};
		await updateReservation({ id: reservation.id, body: objectToPost })
			.unwrap()
			.then((response) => {
				successToast(response.message);
				onClose();
			})
			.catch((error) => {
				errorHandler(error);
			});
	};

	const { data: users = [], isError: userFetchError, error: userErrorObject, isLoading: userLoading } = useGetUsersListQuery({
		email: participantEmailSlice.length ? participantEmailSlice : '/'
	});

	const { data: [reservations, pages] = [], isError: reservationsFetchError, error: reservationErrorObject, isLoading: reservationsLoading } = useGetReservationsFromWorkspaceQuery(
		{
			from: startDate,
			until: (role.includes('Administrator') || role.includes('Lead')) ? endDate : startDate,
			workspaceId: reservation?.workspace?.id,
			...(page && { page })
		}
	);

	useEffect(() => {
		if (userFetchError) {
			const authorizationError = errorHandler(userErrorObject);
			if (authorizationError) navigate('/sign-in');
		}

		if (reservationsFetchError) {
			const authorizationError = errorHandler(reservationErrorObject);
			if (authorizationError) navigate('/sign-in');
		}
	}, [users, reservations]);

	// Render loading state
	if (reservationsLoading || userLoading) {
		return <CircularProgress />;
	}

	return (
		<Container maxWidth="sm" style={{ padding: 0 }}>
			<CssBaseline />
			<main>
				<Box>
					<Container>
						<Typography
							component="h1"
							variant="h4"
							paddingTop={2}
							align="center"
							color="text.primary"
							gutterBottom
						>
							Update reservation <br></br>
							- {reservation?.workspace?.name || ''} -
						</Typography>
					</Container>
					<Container>
						<Stack spacing={1} justifyContent="space-between">
							{ (role.includes('Administrator') || role.includes('Lead'))
								? 	<PrivilegeReservationForm
									handleStartDateChange={handleStartDateChange}
									handleStartHourChange={handleStartHourChange}
									handleEndDateChange={handleEndDateChange}
									handleEndHourChange={handleEndHourChange}
									startDate={startDate}
									endDate={endDate}
									dates={dates}
									startHour={startHour}
									endHour={endHour}
									startHours={startHours}
									endHours={endHours}
									permanentReservation={false}
									users={users}
									handleEmailInputChange={handleEmailInputChange}
								/>
								: 	<StandardReservationForm
									handleStartDateChange={handleStartDateChange}
									handleStartHourChange={handleStartHourChange}
									handleEndHourChange={handleEndHourChange}
									startDate={startDate}
									dates={dates}
									startHour={startHour}
									startHours={startHours}
									endHour={endHour}
									endHours={endHours}
								/>

							}

							<ReservationFormFooter
								users={users}
								selectedUsers={selectedUsers}
								handleParticipantChange={handleParticipantChange}
								handleEmailInputChange={handleEmailInputChange}
								handleSubmit={handleSubmit}
								allowMultipleParticipants={reservation?.workspace?.participantLimit > 1 || !reservation?.workspace?.participantLimit}
							/>
						</Stack>

						{reservations && reservations.length > 0 && (
							(
								<>
									<Typography variant="h5" gutterBottom sx={{ padding: 2 }}>Active reservations for this workspace</Typography>

									<Box spacing={1} direction="row" flexWrap="wrap" margin={0}>
										<Grid ref={divRef} sx={{ display: 'grid', rowGap: 1, columnGap: 1, gridTemplateColumns: 'repeat(1, 1fr)', paddingBottom: 2 }}>
											{reservations.map((reservation) => (
												<ActiveReservationCard key={reservation.id} reservation={reservation}/>
											))}
										</Grid>
									</Box>
								</>)
						)}
					</Container>
					{reservations && reservations.length > 0 &&
						(<BasicPagination count={pages} page={page} onChange={handlePageChange}/>)
					}
				</Box>
			</main>
		</Container>
	);
};
UpdateReservation.propTypes = {
	reservation: PropTypes.object,
	onClose: PropTypes.func,
	startDate: PropTypes.string,
	endDate: PropTypes.string,
	startHour: PropTypes.string,
	endHour: PropTypes.string
};
