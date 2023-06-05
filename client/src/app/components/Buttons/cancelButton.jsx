import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from '../../CSS/Button.Module.css'

export default function CancelButton ({ onClick, text }) {
	return (
		<Stack spacing={2} direction="row" className={styles.buttonWrapper}>
			<Button
				variant="contained"
				className={clsx(styles.button, styles.cancelButton)}
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
