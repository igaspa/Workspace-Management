import { useState, useEffect, useRef } from 'react';
import { Typography, Box, Grid, CircularProgress, InputLabel, Select, FormControl, MenuItem, Chip, OutlinedInput } from '@mui/material';
import { DateFilter } from '../../../components/Filters/dateFilter';
import { TimeFilter } from '../../../components/Filters/timeFilter';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { getNext7Days, getHours, createDate } from '../../../utils/helper';
import { v4 as uuidv4 } from 'uuid';
import SubmitButton from '../../../components/Reservation/submitButton';
import PropTypes from 'prop-types';
import { useCreateReservationMutation, useGetReservationsFromWorkspaceQuery } from '../../../api/reservationApiSlice';
import { successToast } from '../../../utils/toastifyNotification';
import { errorHandler } from '../../../utils/errors';
import { useDispatch } from 'react-redux';
import { workspacesApiSlice } from '../../../api/workspaceApiSlice';
import ActiveReservationCard from '../../../components/Reservation/workspaceReservations';
import { BasicPagination } from '../../../components/Pagination/pagination';
import { useGetUsersListQuery } from '../../../api/usersApiSlice';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

const CreateReservation = ({ workspace, startTime, endTime, reservationDate, onClose }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const currentDay = createDate(0);

	const [date, setDate] = useState(reservationDate || currentDay);
	const [startHour, setStartHour] = useState(startTime || '');
	const [endHour, setEndHour] = useState(endTime || '');
	const [startAt, setStartAt] = useState('');
	const [endAt, setEndAt] = useState('');
	const [createReservation] = useCreateReservationMutation();
	const divRef = useRef();
	const [page, setPage] = useState(1);
	const [selectedUsers, setSelectedUsers] = useState([]);

	const handlePageChange = async (event, value) => {
		setPage(value);
	};

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

	// get selected end hour
	const handleEndHourChange = (event) => {
		setEndHour(event.target.value);
	};

	const handleUserSelect = (event) => {
		const {
			target: { value }
		} = event;
		setSelectedUsers(
			typeof value === 'string' ? value.split(',') : value
		);
	};

	// set startAt value
	useEffect(() => {
		if (date && startHour) {
			setStartAt(`${date}T${startHour}`);
		}
	}, [date, startHour, startAt]);

	// set endAt value
	useEffect(() => {
		if (date && endHour) {
			setEndAt(`${date}T${endHour}`);
		}
	}, [date, endHour, endAt]);

	// eslint-disable-next-line no-unused-vars
	const { data: [reservations, pages] = [], isError: reservationsFetchError, error: reservationErrorObject, isLoading: reservationsLoading } = useGetReservationsFromWorkspaceQuery(
		{
			from: date,
			until: date,
			workspaceId: workspace.id,
			...(page && { page })
		}
	);
	const { data: users = [], isError: userFetchError, error: userErrorObject, isLoading: userLoading } = useGetUsersListQuery();

	useEffect(() => {
		if (reservationsFetchError) {
			const authorizationError = errorHandler(reservationErrorObject);
			if (authorizationError) navigate('/sign-in');
		}
		if (userFetchError) {
			const authorizationError = errorHandler(userErrorObject);
			if (authorizationError) navigate('/sign-in');
		}
	}, [reservations, users]);

	// Render loading state
	if (reservationsLoading || userLoading) {
		return <CircularProgress />;
	}

	const handleSubmit = async (event) => {
		event.preventDefault();

		const participants = selectedUsers.map(user => {
			console.log(user);
			return {
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email
			};
		}
		);

		console.log(participants);
		const objectToPost = {
			id: uuidv4(),
			workspaceId: workspace.id,
			startAt,
			endAt,
			participants
		};

		await createReservation(objectToPost)
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

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<main>
				<Box spacing={2} direction="row" useflexgap={true.toString()} flexWrap="wrap">
					<Container maxWidth="sm">
						<Typography
							component="h1"
							variant="h4"
							align="center"
							color="text.primary"
							gutterBottom
							sx={{ paddingTop: 2 }}
						>
              Reserve a Space <br></br>
							- { workspace.name} -
						</Typography>
					</Container>
					<Container>
						<div style={{ display: 'flex', alignItems: 'center', paddingTop: 20, paddingBottom: 2 }}>
							<Typography align="center" color="text.primary" sx={{ paddingRight: 1, fontSize: 14 }}> Select a date: </Typography>
							<DateFilter onChange={handleDateChange} date={date} dates={dates} />
							<Typography align="center" color="text.primary" sx={{ paddingRight: 1, paddingLeft: 1, fontSize: 14 }}> Start time: </Typography>
							<TimeFilter onChange={handleStartHourChange} hour={startHour} hours={hours}/>
							<Typography align="center" color="text.primary" sx={{ paddingRight: 1, paddingLeft: 1, fontSize: 14 }}> End time: </Typography>
							<TimeFilter onChange={handleEndHourChange} hour={endHour} hours={hours}/>
							{(workspace.workspaceType.allowMultipleParticipants) &&
							<>
								<FormControl sx={{ m: 1, width: 300 }}>
									<InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
									<Select
										labelId="demo-multiple-chip-label"
										id="demo-multiple-chip"
										multiple
										value={selectedUsers}
										onChange={handleUserSelect}
										input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
										renderValue={(selected) => (
											<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
												{selected.map((user) => (
													<Chip key={user.id} label={`${user.firstName} ${user.lastName}`} />
												))}
											</Box>
										)}
									>
										{users.map((user) => (
											<MenuItem
												key={user.id}
												value={user}
											>
												{user.firstName} {user.lastName}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</>

							}

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

export default CreateReservation;

CreateReservation.propTypes = {
	workspace: PropTypes.string,
	startTime: PropTypes.string,
	endTime: PropTypes.string,
	reservationDate: PropTypes.string,
	onClose: PropTypes.func
};
