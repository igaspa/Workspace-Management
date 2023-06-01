import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import { buttonPadding, createButtonStyle } from '../CSS/Button.style';

export default function CreateButton ({ onClick, text }) {
	return (
		<Stack spacing={2} direction="row" sx={buttonPadding}>
			<Button
				variant="contained"
				size="medium"
				sx={createButtonStyle} onClick={onClick}>{text}</Button>
		</Stack>
	);
}

CreateButton.propTypes = {
	onClick: PropTypes.func,
	text: PropTypes.string
};
