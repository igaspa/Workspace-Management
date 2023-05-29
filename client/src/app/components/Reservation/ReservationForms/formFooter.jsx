import PropTypes from 'prop-types';
import { Stack, FormControl } from '@mui/material';
import MultipleUserFilter from '../../Users/multipleUserFilter';
import SubmitButton from '../submitButton';

const ReservationFormFooter = ({ users, selectedUsers, handleParticipantChange, handleEmailInputChange, handleSubmit, allowMultipleParticipants }) => {
	return (
		<Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={1} sx={{ pt: 2.5, pb: 0.25 }}>
			{allowMultipleParticipants && (
				<FormControl sx={{ m: 1, width: '100%' }}>
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
	);
};

ReservationFormFooter.propTypes = {
	users: PropTypes.array.isRequired,
	selectedUsers: PropTypes.array.isRequired,
	handleParticipantChange: PropTypes.func.isRequired,
	handleEmailInputChange: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	allowMultipleParticipants: PropTypes.bool.isRequired
};

export default ReservationFormFooter;
