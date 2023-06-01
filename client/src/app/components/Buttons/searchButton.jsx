import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import { buttonPadding, searchButtonStyle } from './Button.style';

export default function SearchButton ({ onClick, text, disabled }) {
	return (
		<Stack spacing={2} direction="row" sx={buttonPadding}>
			<Button
				variant="contained"
				size="medium"
				sx={searchButtonStyle}
				onClick={onClick}
				disabled={disabled}>{text}</Button>
		</Stack>
	);
}

SearchButton.propTypes = {
	onClick: PropTypes.func,
	text: PropTypes.string,
	disabled: PropTypes.bool
};
