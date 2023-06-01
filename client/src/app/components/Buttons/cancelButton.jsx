import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import { buttonPadding, cancelButtonStyle } from '../CSS/Button.style';

export default function CancelButton ({ onClick, text }) {
	return (
		<Stack spacing={2} direction="row" sx={buttonPadding}>
			<Button
				variant="contained"
				size="medium"
				sx={cancelButtonStyle}
				onClick={onClick}>
				{text}
			</Button>
		</Stack>
	);
}

CancelButton.propTypes = {
	onClick: PropTypes.func,
	text: PropTypes.string
};
