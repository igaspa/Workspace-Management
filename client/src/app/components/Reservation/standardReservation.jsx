import { Stack } from '@mui/material';
import PropTypes from 'prop-types';
import StandardReservationForm from './ReservationForms/standardReservationForm';
import ReservationFormFooter from './ReservationForms/formFooter';

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

		<Stack spacing={1} justifyContent="space-between" style={{ maxWidth: '100%', padding: 20 }}>

			{/* First row */}
			<StandardReservationForm
				handleStartDateChange={handleStartDateChange}
				handleStartHourChange={handleStartHourChange}
				handleEndHourChange={handleEndHourChange}
				startDate={startDate}
				dates={dates}
				startHour={startHour}
				startHours={startHours}
				endHour={endHour}
				endHours={endHours}
			/>

			{/* Second row */}
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
