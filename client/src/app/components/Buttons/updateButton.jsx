import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

export default function UpdateButton ({ onClick, text }) {
	return (
		<Stack spacing={2} direction="row" sx={{ paddingRight: 0.5, paddingTop: 0.5 }}>
			<Button
				variant="contained"
				size="medium"
				sx={{
					background: '#FF6347',
					fontSize: 11,
					':hover': {
						background: '#9090C0'
					}
				}} onClick={onClick}>{text}</Button>
		</Stack>
	);
}

UpdateButton.propTypes = {
	onClick: PropTypes.func,
	text: PropTypes.string
};
