import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

export default function BackofficeButton ({ onChange, text }) {
	return (
		<Stack spacing={2} direction="row" sx={{ paddingLeft: 2 }}>
			<Button
				variant="contained"
				sx={{
					background: '#34495E',
					fontSize: 11,
					':hover': {
						background: '#333'
					}
				}}
				onClick={onChange}>{text}</Button>
		</Stack>
	);
}

BackofficeButton.propTypes = {
	onChange: PropTypes.func,
	text: PropTypes.string
};
