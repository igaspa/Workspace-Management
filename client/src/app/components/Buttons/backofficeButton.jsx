import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './Button.module.css'

export default function BackofficeButton ({ onChange, text }) {
	return (
		<Stack spacing={2} direction="row" className={styles.backofficeButtonWrapper}>
			<Button
				variant="contained"
				className={clsx(styles.button, styles.backofficeButton)}
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
