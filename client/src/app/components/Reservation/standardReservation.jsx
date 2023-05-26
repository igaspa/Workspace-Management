import { FormControl, Stack, Typography } from '@mui/material';
import { TimeFilter } from '../Filters/timeFilter';
import SubmitButton from './submitButton';
import MultipleUserFilter from '../Users/multipleUserFilter';
import PropTypes from 'prop-types';
import DateTimePicker from '../Dates/DateTimePicker';

const StandardReservation = ({
	handleStartDateChange,
	handleStartHourChange,
	handleEndHourChange,
	startHour,
	startHours,
	endHour,
	endHours,
	startDate,
	dates,
	users,
	selectedUsers,
	handleParticipantChange,
	handleEmailInputChange,
	workspaceType,
	handleSubmit
}) => {
	return (
		<Stack spacing={1} justifyContent="space-between">

			{/* First row */}
			<Stack
				direction="row"
				alignItems="center"
				justifyContent="flex-end"
				spacing={1}
				sx={{ pt: 2.5, pb: 0.25 }}
			>

				<DateTimePicker
					dateLabel='Date' timeLabel='Start Time'
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
				<TimeFilter
					onChange={handleEndHourChange}
					hour={endHour}
					hours={endHours}
				/>

			</Stack>

			{/* Second row */}
			<Stack
				direction="row"
				alignItems="center"
				justifyContent="flex-end"
				spacing={1}
				sx={{ pt: 2.5, pb: 0.25 }}
			>
				{workspaceType.allowMultipleParticipants && (
					<FormControl sx={{ m: 1, width: 280 }}>
						<MultipleUserFilter
							users={users}
							selectedUsers={selectedUsers}
							handleParticipantChange={handleParticipantChange}
							handleEmailInputChange={handleEmailInputChange}
						/>
					</FormControl>
				)}
				<SubmitButton onChange={handleSubmit} />
			</Stack>
		</Stack>
	);
};

export default StandardReservation;

StandardReservation.propTypes = {
	handleStartDateChange: PropTypes.func,
	handleStartHourChange: PropTypes.func,
	handleEndHourChange: PropTypes.func,
	startHour: PropTypes.string,
	startHours: PropTypes.array,
	endHour: PropTypes.string,
	endHours: PropTypes.array,
	startDate: PropTypes.string,
	dates: PropTypes.array,
	users: PropTypes.array,
	selectedUsers: PropTypes.array,
	handleParticipantChange: PropTypes.func,
	handleEmailInputChange: PropTypes.func,
	workspaceType: PropTypes.object,
	handleSubmit: PropTypes.func
};
