import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

export default function SearchButton ({ onClick, text, disabled }) {
	return (
		<Stack spacing={2} direction="row">
			<Button
				variant="contained"
				size="small"
				sx={{
					background: '#9090C0',
					fontSize: 11,
					':hover': {
						background: '#9090C0'
					}
				}} onClick={onClick}
				disabled={disabled}>{text}</Button>
		</Stack>
	);
}

SearchButton.propTypes = {
	onClick: PropTypes.func,
	text: PropTypes.string,
	disabled: PropTypes.bool
};
