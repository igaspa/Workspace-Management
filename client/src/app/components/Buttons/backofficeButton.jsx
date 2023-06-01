import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import { backofficeButtonPadding, backofficeButtonStyle } from '../CSS/Button.style';

export default function BackofficeButton ({ onChange, text }) {
	return (
		<Stack spacing={2} direction="row" sx={backofficeButtonPadding}>
			<Button
				variant="contained"
				sx={backofficeButtonStyle}
				onClick={onChange}>
				{text}
			</Button>
		</Stack>
	);
}

BackofficeButton.propTypes = {
	onChange: PropTypes.func,
	text: PropTypes.string
};
