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
	workspaceType,
	handleSubmit
}) => {
	return (
		<Stack spacing={1} justifyContent="space-between" style={{ maxWidth: '100%', padding: 20 }}>

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

			{/* Stack 4 */}
			<ReservationFormFooter
				users={users}
				selectedUsers={selectedUsers}
				handleParticipantChange={handleParticipantChange}
				handleEmailInputChange={handleEmailInputChange}
				handleSubmit={handleSubmit}
				allowMultipleParticipants={workspaceType.allowMultipleParticipants}
			/>

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
