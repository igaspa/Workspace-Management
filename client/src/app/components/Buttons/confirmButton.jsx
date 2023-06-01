import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import { buttonPadding, confirmButtonStyle } from '../CSS/Button.style';

export default function ConfirmButton ({ onClick, text, type }) {
	return (
		<Stack spacing={2} direction="row" sx={buttonPadding}>
			<Button
				variant="contained"
				size="medium"
				sx={confirmButtonStyle}
				type={type}
				onClick={onClick}>{text}
			</Button>
		</Stack>
	);
}

ConfirmButton.propTypes = {
	onClick: PropTypes.func,
	text: PropTypes.string,
	type: PropTypes.string
};
