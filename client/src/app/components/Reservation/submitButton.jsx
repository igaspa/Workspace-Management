import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

export default function SubmitButton ({ onChange }) {
	return (
		<Stack spacing={2} direction="row" sx={{ paddingLeft: 2 }}>
			<Button variant="contained" size="small" onClick={onChange}>SUBMIT</Button>
		</Stack>
	);
}

SubmitButton.propTypes = {
	onChange: PropTypes.func
};
