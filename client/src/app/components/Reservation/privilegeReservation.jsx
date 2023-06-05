import { MenuItem, Select, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import PrivilegeReservationForm from './ReservationForms/privilegeReservationForm';
import ReservationFormFooter from './ReservationForms/formFooter';

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
	workspaceType
}) => {
	return (
		<>
			{/* Reservation info */}
			{workspaceType.allowPermanentReservations && (
				<Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={1} paddingBottom={2}>
					<Typography color="text.primary" sx={{ fontSize: 15 }}>
                  		Reservation Type:
					</Typography>
					<Select value={permanentReservation} onChange={handleReservationTypeChange} required>
						<MenuItem value={false}>Standard</MenuItem>
						<MenuItem value={true}>Permanent</MenuItem>
					</Select>
				</Stack>
			)}

			{/* Reservation form */}
			<PrivilegeReservationForm
				handleStartDateChange={handleStartDateChange}
				handleStartHourChange={handleStartHourChange}
				handleEndDateChange={handleEndDateChange}
				handleEndHourChange={handleEndHourChange}
				startDate={startDate}
				endDate={endDate}
				dates={dates}
				startHour={startHour}
				endHour={endHour}
				startHours={startHours}
				endHours={endHours}
				permanentReservation={permanentReservation}
				users={users}
				selectedUser={selectedUser}
				handleSelectedUser={handleSelectedUser}
				handleEmailInputChange={handleEmailInputChange}
			/>

			{/* Reservation footer */}
			<ReservationFormFooter
				users={users}
				selectedUsers={selectedUsers}
				handleParticipantChange={handleParticipantChange}
				handleEmailInputChange={handleEmailInputChange}
				allowMultipleParticipants={workspaceType.allowMultipleParticipants}
			/>
		</>
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
};
