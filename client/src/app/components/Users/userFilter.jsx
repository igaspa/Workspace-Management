import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const UserFilter = ({ users, selectedUsers, handleParticipantChange, handleEmailInputChange }) => {
	return (
		<Autocomplete
			id="tags-standard"
			options={users}
			value={selectedUsers}
			onChange={handleParticipantChange}
			getOptionLabel={(option) => `${option.email || ''}`}
			renderInput={(params) => (
				<TextField
					required
					{...params}
					variant="standard"
					label="User"
					placeholder='Enter 3 characters'
					onChange={handleEmailInputChange}
				/>
			)}
		/>
	);
};

UserFilter.propTypes = {
	users: PropTypes.array.isRequired,
	selectedUsers: PropTypes.object,
	handleParticipantChange: PropTypes.func.isRequired,
	handleEmailInputChange: PropTypes.func.isRequired
};

export default UserFilter;
