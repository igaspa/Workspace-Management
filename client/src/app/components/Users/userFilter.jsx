import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';

const UserFilter = ({ onChange, users }) => {
	UserFilter.propTypes = {
		onChange: PropTypes.func,
		users: PropTypes.array
	};

	return (
		<Stack spacing={3} sx={{ width: 200, paddingTop: 1 }}>
			<Autocomplete
				id="filter"
				options={users}
				getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
				isOptionEqualToValue={(option, value) => option.email === value.email}
				renderInput={(params) => <TextField {...params}/>}
				onChange = {onChange}
			/>
		</Stack>
	);
};

export default UserFilter;
