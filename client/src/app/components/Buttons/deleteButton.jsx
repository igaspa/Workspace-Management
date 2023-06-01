import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import { buttonPadding, deleteButtonStyle } from '../CSS/Button.style';

export default function DeleteButton ({ onClick, text }) {
	return (
		<Stack spacing={2} direction="row" sx={buttonPadding}>
			<Button
				variant="contained"
				size="medium"
				sx={deleteButtonStyle}
				onClick={onClick}>
				{text}
			</Button>
		</Stack>
	);
}

DeleteButton.propTypes = {
	onClick: PropTypes.func,
	text: PropTypes.string
};
