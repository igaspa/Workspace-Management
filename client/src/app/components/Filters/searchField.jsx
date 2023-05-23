import { TextField } from '@mui/material';
import PropTypes from 'prop-types';

const SearchField = ({ data, name, onChange }) => {
	return (
		<TextField
			data={data}
			name={name}
			sx={{ paddingRight: 1 }}
			placeholder="Enter 3 characters"
			onChange={onChange}
		/>
	);
};

SearchField.propTypes = {
	data: PropTypes.array,
	name: PropTypes.string,
	onChange: PropTypes.func
};

export default SearchField;
