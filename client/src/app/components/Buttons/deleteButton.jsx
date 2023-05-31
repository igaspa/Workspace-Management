import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

export default function DeleteButton ({ onClick, text }) {
	return (
		<Stack spacing={2} direction="row" sx={{ paddingRight: 0.5, paddingTop: 0.5 }}>
			<Button
				variant="contained"
				size="medium"
				sx={{
					background: '#4A646C',
					fontSize: 11,
					':hover': {
						background: '#36454F'
					}
				}}
				onClick={onClick}
			>
				{text}
			</Button>
		</Stack>
	);
}

DeleteButton.propTypes = {
	onClick: PropTypes.func,
	text: PropTypes.string
};
