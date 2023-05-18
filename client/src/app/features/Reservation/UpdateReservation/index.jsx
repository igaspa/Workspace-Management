import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Container, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { DateFilter } from '../../../components/Filters/dateFilter';
import { TimeFilter } from '../../../components/Filters/timeFilter';
import { getNext7Days, getHours } from '../../../utils/helper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import SubmitButton from '../../../components/Reservation/submitButton';
import { useUpdateReservationMutation } from '../../../api/reservationApiSlice';
import { successToast } from '../../../utils/toastifyNotification';
import { errorHandler } from '../../../utils/errors';

const theme = createTheme();

export default function UpdateReservation ({ reservationId, onClose }) {
	const [date, setDate] = useState('');
	const [startHour, setStartHour] = useState('');
	const [endHour, setEndHour] = useState('');
	const [startAt, setStartAt] = useState('');
	const [endAt, setEndAt] = useState('');
	const [updateReservation] = useUpdateReservationMutation();

	const hours = getHours();
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

	const handleSubmit = async (event) => {
		event.preventDefault();
		const objectToPost = {
			startAt,
			endAt
		};
		await updateReservation({ id: reservationId, body: objectToPost })
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
				<Box>
					<Container maxWidth="sm">
						<Typography
							component="h1"
							variant="h2"
							align="center"
							color="text.primary"
							gutterBottom
						>
             Update reservation
						</Typography>
					</Container>
					<Container>
						<div style={{ display: 'flex', alignItems: 'center', paddingTop: 20, paddingBottom: 2 }}>
							<Typography align="center" color="text.primary" sx={{ paddingRight: 1, fontSize: 15 }}> Select a date: </Typography>
							<DateFilter onChange={handleDateChange} date={date} dates={dates} />
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
UpdateReservation.propTypes = {
	reservationId: PropTypes.string,
	onClose: PropTypes.func
};
