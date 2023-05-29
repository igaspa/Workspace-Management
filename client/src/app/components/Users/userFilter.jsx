import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const UserFilter = ({ users, selectedUser, handleUserChange, handleEmailInputChange }) => {
	return (
		<Autocomplete
			id="tags-standard"
			options={users}
			value={selectedUser}
			onChange={handleUserChange}
			getOptionLabel={(option) => `${option.email || ''}`}
			renderInput={(params) => (
				<TextField
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
	users: PropTypes.array,
	selectedUser: PropTypes.object,
	handleUserChange: PropTypes.func,
	handleEmailInputChange: PropTypes.func
};

export default UserFilter;
