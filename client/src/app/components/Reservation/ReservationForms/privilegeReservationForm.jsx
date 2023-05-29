import { Stack, Typography, FormControl } from '@mui/material';
import DateTimePicker from '../../Dates/DateTimePicker';
import PropTypes from 'prop-types';
import UserFilter from '../../Users/userFilter';

const PrivilegeReservationForm = ({
	handleStartDateChange,
	handleStartHourChange,
	handleEndDateChange,
	handleEndHourChange,
	startDate,
	endDate,
	dates,
	startHour,
	endHour,
	startHours,
	endHours,
	permanentReservation,
	users,
	selectedUser,
	handleSelectedUser,
	handleEmailInputChange
}) => {
	return (
		<div>
			<Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={1} sx={{ pt: 2.5, pb: 0.25 }}>
				<DateTimePicker
					dateLabel="Start Date"
					timeLabel="Start Time"
					handleDateChange={handleStartDateChange}
					handleHourChange={handleStartHourChange}
					date={startDate}
					dates={dates}
					hour={startHour}
					hours={startHours}
				/>
			</Stack>

			<Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={1} sx={{ pt: 2.5, pb: 0.25 }}>
				{permanentReservation
					? (
						<>
							<Typography align="center" color="text.primary" sx={{ paddingRight: 1, paddingLeft: 1, fontSize: 15 }}>
                Select a user:
							</Typography>
							<FormControl sx={{ m: 1, width: '100%' }}>
								<UserFilter
									users={users}
									selectedUser={selectedUser}
									handleUserChange={handleSelectedUser}
									handleEmailInputChange={handleEmailInputChange}
								/>
							</FormControl>
						</>
					)
					: (
						<DateTimePicker
							dateLabel="End Date"
							timeLabel="End Time"
							handleDateChange={handleEndDateChange}
							handleHourChange={handleEndHourChange}
							date={endDate}
							dates={dates}
							hour={endHour}
							hours={endHours}
						/>
					)}
			</Stack>

		</div>
	);
};

PrivilegeReservationForm.propTypes = {
	handleStartDateChange: PropTypes.func.isRequired,
	handleStartHourChange: PropTypes.func.isRequired,
	handleEndDateChange: PropTypes.func.isRequired,
	handleEndHourChange: PropTypes.func.isRequired,
	startDate: PropTypes.string.isRequired,
	endDate: PropTypes.string.isRequired,
	dates: PropTypes.array.isRequired,
	startHour: PropTypes.string.isRequired,
	endHour: PropTypes.string.isRequired,
	startHours: PropTypes.array.isRequired,
	endHours: PropTypes.array.isRequired,
	permanentReservation: PropTypes.bool.isRequired,
	users: PropTypes.array.isRequired,
	selectedUser: PropTypes.object,
	handleSelectedUser: PropTypes.func,
	handleEmailInputChange: PropTypes.func
};

export default PrivilegeReservationForm;
