import { FormControl, MenuItem, Select, Stack, Typography } from '@mui/material';
import SubmitButton from './submitButton';
import MultipleUserFilter from '../Users/multipleUserFilter';
import PropTypes from 'prop-types';
import DateTimePicker from '../Dates/DateTimePicker';
import UserFilter from '../Users/userFIlter';

const PrivilegeReservation = ({
	permanentReservation,
	handleReservationTypeChange,
	handleStartDateChange,
	handleStartHourChange,
	handleEndDateChange,
	handleEndHourChange,
	startHour,
	startHours,
	endHour,
	endHours,
	startDate,
	endDate,
	dates,
	users,
	selectedUsers,
	selectedUser,
	handleSelectedUser,
	handleParticipantChange,
	handleEmailInputChange,
	workspaceType,
	handleSubmit
}) => {
	return (
		<Stack spacing={1} justifyContent="space-between">

			{/* Stack 1 */}
			{workspaceType.allowPermanentReservations && (
				<Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={1} sx={{ pt: 2.5, pb: 0.25, width: '100%' }}>
					<Typography color="text.primary" sx={{ fontSize: 15 }}>
                  Reservation Type:
					</Typography>
					<Select value={permanentReservation} onChange={handleReservationTypeChange}>
						<MenuItem value={false}>Standard</MenuItem>
						<MenuItem value={true}>Permanent</MenuItem>
					</Select>
				</Stack>
			)}

			{/* Stack 2 */}
			<Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={1} sx={{ pt: 2.5, pb: 0.25 }}>

				<DateTimePicker
					dateLabel='Start date' timeLabel='Start Time'
					handleDateChange={handleStartDateChange}
					handleHourChange={handleStartHourChange}
					date={startDate}
					dates={dates}
					hour={startHour}
					hours={startHours}
				/>

			</Stack>

			{/* Stack 3 */}
			<Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={1} sx={{ pt: 2.5, pb: 0.25 }}>

				{permanentReservation
					? <>
						<Typography align="center" color="text.primary" sx={{ paddingRight: 1, paddingLeft: 1, fontSize: 15 }}> Select a user: </Typography>
						<FormControl sx={{ m: 1, width: 300 }}>
							<UserFilter
								users={users}
								selectedUser={selectedUser}
								handleUserChange={handleSelectedUser}
								handleEmailInputChange={handleEmailInputChange} />
						</FormControl>
					</>
					: <DateTimePicker
						dateLabel='End date' timeLabel='End Time'
						handleDateChange={handleEndDateChange}
						handleHourChange={handleEndHourChange}
						date={endDate}
						dates={dates}
						hour={endHour}
						hours={endHours}
					/>
				}
			</Stack>

			{/* Stack 4 */}
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

export default PrivilegeReservation;

PrivilegeReservation.propTypes = {
	permanentReservation: PropTypes.bool,
	handleReservationTypeChange: PropTypes.func,
	handleStartDateChange: PropTypes.func,
	handleEndDateChange: PropTypes.func,
	handleStartHourChange: PropTypes.func,
	handleEndHourChange: PropTypes.func,
	startHour: PropTypes.string,
	startHours: PropTypes.array,
	endHour: PropTypes.string,
	endHours: PropTypes.array,
	startDate: PropTypes.string,
	endDate: PropTypes.string,
	dates: PropTypes.array,
	users: PropTypes.array,
	selectedUsers: PropTypes.array,
	selectedUser: PropTypes.object,
	handleParticipantChange: PropTypes.func,
	handleSelectedUser: PropTypes.func,
	handleEmailInputChange: PropTypes.func,
	workspaceType: PropTypes.object,
	handleSubmit: PropTypes.func
};
