import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

export default function CreateButton ({ onClick, text }) {
	return (
		<Stack spacing={2} direction="row" sx={{ paddingBottom: 2 }}>
			<Button
				variant="contained"
				size="medium"
				sx={{
					background: '#00A4A6',
					fontSize: 11,
					':hover': {
						background: '#008080'
					}
				}} onClick={onClick}>{text}</Button>
		</Stack>
	);
}

CreateButton.propTypes = {
	onClick: PropTypes.func,
	text: PropTypes.string
};
