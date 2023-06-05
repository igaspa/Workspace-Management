import { Typography } from '@mui/material';
import { DateFilter } from '../Filters/dateFilter';
import { TimeFilter } from '../Filters/timeFilter';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';

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
		<Box display="flex" gap={1} alignItems="center" justifyContent="flex-end">
			<Box display="flex" alignItems="center" justifyContent="flex-end">
				<Typography color="text.primary" sx={{ fontSize: 15, paddingRight: 1 }}>
					{dateLabel}: 
				</Typography>
				<DateFilter onChange={handleDateChange} date={date} dates={dates} />
			</Box>

			<Box display="flex" alignItems="center" justifyContent="flex-end">
				<Typography color="text.primary" sx={{ fontSize: 15, paddingRight: 1 }}>
					{timeLabel}: 
				</Typography>
				<TimeFilter onChange={handleHourChange} hour={hour} hours={hours} />
			</Box>
	  	</Box>


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
