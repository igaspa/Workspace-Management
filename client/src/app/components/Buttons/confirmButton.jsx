import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

export default function ConfirmButton ({ onClick, text, type }) {
	return (
		<Stack spacing={2} direction="row" sx={{ paddingLeft: 2 }}>
			<Button
				variant="contained"
				size="small"
				sx={{
					background: '#59a2cb',
					fontSize: 11,
					':hover': {
						background: '#3787b5'
					}
				}} type={type} onClick={onClick}>{text}</Button>
		</Stack>
	);
}

ConfirmButton.propTypes = {
	onClick: PropTypes.func,
	text: PropTypes.string,
	type: PropTypes.type
};
