import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
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
		<Box 
      width="100%"  
      display="flex"
      flexDirection="row"
      flexWrap="wrap"
      justifyContent={"flex-end"}
      gap={1}
      paddingBottom={2}
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

      <Box display="flex" alignItems="center" padding={0}>
        <Typography color="text.primary" sx={{ fontSize: 15, paddingRight: 1 }}>
          End Time:
        </Typography>
       <TimeFilter onChange={handleEndHourChange} hour={endHour} hours={endHours} />
      </Box>

    </Box>

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
