import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

export default function CreateButton ({ onClick, text }) {
	return (
		<Stack spacing={2} direction="row">
			<Button
				variant="contained"
				size="medium"
				sx={{
					background: '#54626F',
					fontSize: 11,
					':hover': {
						background: '#98AFC7'
					}
				}} onClick={onClick}>{text}</Button>
		</Stack>
	);
}

CreateButton.propTypes = {
	onClick: PropTypes.func,
	text: PropTypes.string
};
