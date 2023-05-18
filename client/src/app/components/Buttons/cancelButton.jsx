import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

export default function CancelButton ({ onClick, text }) {
	return (
		<Stack spacing={2} direction="row" sx={{ paddingLeft: 2 }}>
			<Button
				variant="contained"
				size="small"
				sx={{
					background: '#34495E',
					fontSize: 11,
					':hover': {
						background: '#1978D4'
					}
				}} onClick={onClick}>{text}</Button>
		</Stack>
	);
}

CancelButton.propTypes = {
	onClick: PropTypes.func,
	text: PropTypes.string
};
