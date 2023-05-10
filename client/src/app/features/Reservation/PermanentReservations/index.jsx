import { useState, useEffect } from 'react';
import { Typography, Box, CircularProgress } from '@mui/material';
import { DateFilter } from '../../../components/Filters/dateFilter';
import { TimeFilter } from '../../../components/Filters/timeFilter';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { getNext7Days, getHours, createDate } from '../../../utils/helper';
import { v4 as uuidv4 } from 'uuid';
import SubmitButton from '../../../components/Reservation/submitButton';
import PropTypes from 'prop-types';
import { useCreatePermanentReservationMutation } from '../../../api/reservationApiSlice';
import { useGetUsersListQuery } from '../../../api/usersApiSlice';
import { successToast } from '../../../utils/toastifyNotification';
import { errorHandler } from '../../../utils/errors';
import UserFilter from '../../../components/Users/userFilter';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

const CreatePermanentReservation = ({ workspaceId, onClose }) => {
	const currentDay = createDate(0);
	const [date, setDate] = useState(currentDay);
	const [startHour, setStartHour] = useState('');
	const [startAt, setStartAt] = useState('');
	const [createPermanentReservation] = useCreatePermanentReservationMutation();
	const [selectedUser, setSelectedUser] = useState([]);
	const navigate = useNavigate();

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

	const { data: usersData = [], isError: userError, isLoading: userLoading, error: userErrorObject } = useGetUsersListQuery();

	const handleSelectedUser = (selectedUser) => {
		setSelectedUser(selectedUser);
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
				onClose();
			})
			.catch((error) => {
				errorHandler(error);
			});
	};
	useEffect(() => {
		if (userError) {
			const authorizationError = errorHandler(userErrorObject);
			if (authorizationError) navigate('/sign-in');
		}
	}, [usersData]);

	// Render loading state
	if (userLoading) {
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
							variant="h2"
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
							<UserFilter users={usersData} onChange={(event, data) => {
								handleSelectedUser(data);
							}} />
							<SubmitButton onChange={handleSubmit} />
						</div>
					</Container>
				</Box>
			</main>
		</ThemeProvider>
	);
};

export default CreatePermanentReservation;

CreatePermanentReservation.propTypes = {
	workspaceId: PropTypes.string,
	startTime: PropTypes.string,
	endTime: PropTypes.string,
	reservationDate: PropTypes.string,
	onClose: PropTypes.func
};
