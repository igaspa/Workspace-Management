import { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import { DateFilter } from '../../../components/Filters/dateFilter';
import { TimeFilter } from '../../../components/Filters/timeFilter';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { getNext7Days, getHours, createDate } from '../../../utils/helper';
import { v4 as uuidv4 } from 'uuid';
import SubmitButton from '../../../components/Reservation/submitButton';
import PropTypes from 'prop-types';
import { useCreateReservationMutation } from '../../../api/reservationApiSlice';
import { successToast } from '../../../utils/toastifyNotification';
import { errorHandler } from '../../../utils/errors';

const theme = createTheme();

const CreateMultipleReservation = ({ workspaceId, onClose, endTime, startTime }) => {
	const currentDay = createDate(0);
	const [startDate, setStartDate] = useState(currentDay);
	const [endDate, setEndDate] = useState('');
	const [startHour, setStartHour] = useState(startTime || '');
	const [startAt, setStartAt] = useState('');
	const [endHour, setEndHour] = useState(endTime || '');
	const [endAt, setEndAt] = useState('');
	const [createPermanentReservation] = useCreateReservationMutation();

	const hours = getHours(startDate);
	const dates = getNext7Days();

	// get selected start date
	const handleStartDateChange = (event) => {
		setStartDate(event.target.value);
	};

	// get selected start date
	const handleEndDateChange = (event) => {
		setEndDate(event.target.value);
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
		if (endDate && endHour) {
			setEndAt(`${endDate}T${endHour}`);
		}
	}, [endDate, endHour, endAt]);

	const handleSubmit = async (event) => {
		event.preventDefault();

		const objectToPost = {
			id: uuidv4(),
			workspaceId,
			startAt,
			endAt
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
               Reserve a Space for multiple days
						</Typography>
					</Container>
					<Container>
						<div style={{ display: 'flex', alignItems: 'center', paddingTop: 20, paddingBottom: 2 }}>
							<Typography align="center" color="text.primary" sx={{ paddingRight: 1, fontSize: 15 }}> Select a start date: </Typography>
							<DateFilter onChange={handleStartDateChange} date={startDate} dates={dates} />
							<Typography align="center" color="text.primary" sx={{ paddingRight: 1, paddingLeft: 1, fontSize: 15 }}> Select an end date: </Typography>
							<DateFilter onChange={handleEndDateChange} date={endDate} dates={dates} />
							<Typography align="center" color="text.primary" sx={{ paddingRight: 1, paddingLeft: 1, fontSize: 15 }}> from: </Typography>
							<TimeFilter onChange={handleStartHourChange} hour={startHour} hours={hours}/>
							<Typography align="center" color="text.primary" sx={{ paddingRight: 1, paddingLeft: 1, fontSize: 15 }}> until: </Typography>
							<TimeFilter onChange={handleEndHourChange} hour={endHour} hours={hours}/>
							<SubmitButton onChange={handleSubmit} />
						</div>
					</Container>
				</Box>
			</main>
		</ThemeProvider>
	);
};

export default CreateMultipleReservation;

CreateMultipleReservation.propTypes = {
	workspaceId: PropTypes.string,
	startTime: PropTypes.string,
	endTime: PropTypes.string,
	reservationDate: PropTypes.string,
	onClose: PropTypes.func
};
