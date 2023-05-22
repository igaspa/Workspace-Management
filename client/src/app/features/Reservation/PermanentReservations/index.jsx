import { useState, useEffect, useRef } from 'react';
import { Typography, Box, CircularProgress, Grid, FormControl } from '@mui/material';
import { DateFilter } from '../../../components/Filters/dateFilter';
import { TimeFilter } from '../../../components/Filters/timeFilter';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { getNext7Days, getHours, createDate } from '../../../utils/helper';
import { v4 as uuidv4 } from 'uuid';
import SubmitButton from '../../../components/Reservation/submitButton';
import PropTypes from 'prop-types';
import { useCreatePermanentReservationMutation, useGetReservationsFromWorkspaceQuery } from '../../../api/reservationApiSlice';
import { useGetUsersListQuery } from '../../../api/usersApiSlice';
import { successToast } from '../../../utils/toastifyNotification';
import { errorHandler } from '../../../utils/errors';
import UserFilter from '../../../components/Users/userFIlter';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { workspacesApiSlice } from '../../../api/workspaceApiSlice';
import { BasicPagination } from '../../../components/Pagination/pagination';
import ActiveReservationCard from '../../../components/Reservation/workspaceReservations';

const theme = createTheme();

const CreatePermanentReservation = ({ workspaceId, onClose, reservationDate, startTime }) => {
	const [createPermanentReservation] = useCreatePermanentReservationMutation();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const currentDay = createDate(0);
	const [date, setDate] = useState(reservationDate || currentDay);
	const [startHour, setStartHour] = useState(startTime || '');
	const [startAt, setStartAt] = useState('');

	const [page, setPage] = useState(1);
	const divRef = useRef();

	const [selectedUser, setSelectedUser] = useState({});
	const [participantEmailSlice, setParticipantEmailSlice] = useState('');

	const hours = getHours(date);
	const dates = getNext7Days();
	// get selected date
	const handleDateChange = (event) => {
		setDate(event.target.value);
	};
	// get selected start hour
	const handleStartHourChange = (event) => {
		setStartHour(event.target.value);
	};

	// set startAt value
	useEffect(() => {
		if (date && startHour) {
			setStartAt(`${date}T${startHour}`);
		}
	}, [date, startHour, startAt]);

	const handlePageChange = async (event, value) => {
		setPage(value);
	};

	const handleSelectedUser = (event, selectedUser) => {
		setSelectedUser(selectedUser);
	};

	const handleEmailInputChange = (e) => {
		const email = e.target.value;
		if (e.target.value.length > 2) setParticipantEmailSlice(email.slice(0, 3));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const objectToPost = {
			id: uuidv4(),
			userId: selectedUser.id,
			workspaceId,
			startAt
		};

		await createPermanentReservation(objectToPost)
			.unwrap()
			.then((response) => {
				successToast(response.message);
				dispatch(workspacesApiSlice.util.invalidateTags(['workspacesList']));
				onClose();
			})
			.catch((error) => {
				errorHandler(error);
			});
	};

	const { data: [reservations, pages] = [], isError: reservationsFetchError, error: reservationErrorObject, isLoading: reservationsLoading } = useGetReservationsFromWorkspaceQuery(
		{
			from: date,
			workspaceId,
			...(page && { page })
		}
	);

	const { data: users = [], isError: userFetchError, error: userErrorObject, isLoading: userLoading } = useGetUsersListQuery({
		email: participantEmailSlice.length ? participantEmailSlice : '/'
	});

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
	if (userLoading || reservationsLoading) {
		return <CircularProgress />;
	}

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<main>
				<Box spacing={2} direction="row" useflexgap={true.toString()} flexWrap="wrap">
					<Container maxWidth="sm">
						<Typography
							component="h1"
							variant="h4"
							paddingTop={2}
							align="center"
							color="text.primary"
							gutterBottom
						>
              Permanently Reserve a Space
						</Typography>
					</Container>
					<Container>
						<div style={{ display: 'flex', alignItems: 'center', paddingTop: 20, paddingBottom: 2 }}>
							<Typography align="center" color="text.primary" sx={{ paddingRight: 1, fontSize: 15 }}> Select a date: </Typography>
							<DateFilter onChange={handleDateChange} date={date} dates={dates} />
							<Typography align="center" color="text.primary" sx={{ paddingRight: 1, paddingLeft: 1, fontSize: 15 }}> from: </Typography>
							<TimeFilter onChange={handleStartHourChange} hour={startHour} hours={hours}/>
						</div>
						<div style={{ display: 'flex', alignItems: 'center', paddingTop: 20, paddingBottom: 2 }}>
							<Typography align="center" color="text.primary" sx={{ paddingRight: 1, paddingLeft: 1, fontSize: 15 }}> Select a user: </Typography>
							<FormControl sx={{ m: 1, width: 300 }}>
								<UserFilter
									users={users}
									selectedUsers={selectedUser}
									handleParticipantChange={handleSelectedUser}
									handleEmailInputChange={handleEmailInputChange} />
							</FormControl>
							<SubmitButton onChange={handleSubmit} />
						</div>

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
		</ThemeProvider>
	);
};

export default CreatePermanentReservation;

CreatePermanentReservation.propTypes = {
	workspaceId: PropTypes.string,
	startTime: PropTypes.string,
	reservationDate: PropTypes.string,
	onClose: PropTypes.func
};
