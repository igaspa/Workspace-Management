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
		<div style={{ display: 'flex', flexDirection: 'column' }}>

			<Stack alignItems="center" justifyContent="flex-end" style={{ flex: 1, paddingBottom: 20 }} spacing={1} display="flex" direction="row">
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

			<Stack direction={'row'} alignItems="center" justifyContent="flex-end" spacing={1} >
				{permanentReservation
					? (
						<>
							<Typography align="center" color="text.primary" sx={{ fontSize: 14 }}>
								Select a user:
							</Typography>
							<FormControl sx={{ p: 1, width: '100%' }}>
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
