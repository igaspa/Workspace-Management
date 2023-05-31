import { Typography } from '@mui/material';
import { DateFilter } from '../Filters/dateFilter';
import { TimeFilter } from '../Filters/timeFilter';
import PropTypes from 'prop-types';

const DateTimePicker = ({
	dateLabel,
	timeLabel,
	handleDateChange,
	handleHourChange,
	date,
	dates,
	hour,
	hours
}) => {
	return (
		<>
			<Typography color="text.primary" sx={{ fontSize: 15 }}>
				{dateLabel}:
			</Typography>
			<DateFilter onChange={handleDateChange} date={date} dates={dates} />

			<Typography color="text.primary" sx={{ fontSize: 15 }}>
				{timeLabel}:
			</Typography>
			<TimeFilter onChange={handleHourChange} hour={hour} hours={hours} />
		</>
	);
};

DateTimePicker.propTypes = {
	dateLabel: PropTypes.string.isRequired,
	timeLabel: PropTypes.string.isRequired,
	handleDateChange: PropTypes.func.isRequired,
	handleHourChange: PropTypes.func.isRequired,
	date: PropTypes.string.isRequired,
	dates: PropTypes.array.isRequired,
	hour: PropTypes.string.isRequired,
	hours: PropTypes.array.isRequired
};

export default DateTimePicker;
