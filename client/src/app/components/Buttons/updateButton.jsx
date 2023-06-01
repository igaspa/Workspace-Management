import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import { buttonPadding, updateButtonStyle } from '../CSS/Button.style';

export default function UpdateButton ({ onClick, text }) {
	return (
		<Stack spacing={2} direction="row" sx={buttonPadding}>
			<Button
				variant="contained"
				size="medium"
				sx={updateButtonStyle}
				onClick={onClick}>{text}</Button>
		</Stack>
	);
}

UpdateButton.propTypes = {
	onClick: PropTypes.func,
	text: PropTypes.string
};
