import PropTypes from 'prop-types';
import { Stack, Typography } from '@mui/material';
import DateTimePicker from '../../Dates/DateTimePicker';
import { TimeFilter } from '../../Filters/timeFilter';

const StandardReservationForm = ({
	handleStartDateChange,
	handleStartHourChange,
	handleEndHourChange,
	startDate,
	dates,
	startHour,
	startHours,
	endHour,
	endHours
}) => {
	return (
		<Stack
			direction="row"
			alignItems="center"
			justifyContent="flex-end"
			spacing={1}
			sx={{ pt: 2.5, pb: 0.25 }}
		>
			<DateTimePicker
				dateLabel="Date"
				timeLabel="Start Time"
				handleDateChange={handleStartDateChange}
				handleHourChange={handleStartHourChange}
				date={startDate}
				dates={dates}
				hour={startHour}
				hours={startHours}
			/>

			<Typography color="text.primary" sx={{ fontSize: 15 }}>
        End Time:
			</Typography>
			<TimeFilter onChange={handleEndHourChange} hour={endHour} hours={endHours} />
		</Stack>
	);
};

StandardReservationForm.propTypes = {
	handleStartDateChange: PropTypes.func.isRequired,
	handleStartHourChange: PropTypes.func.isRequired,
	handleEndHourChange: PropTypes.func.isRequired,
	startDate: PropTypes.string.isRequired,
	dates: PropTypes.array.isRequired,
	startHour: PropTypes.string.isRequired,
	startHours: PropTypes.array.isRequired,
	endHour: PropTypes.string.isRequired,
	endHours: PropTypes.array.isRequired
};

export default StandardReservationForm;
