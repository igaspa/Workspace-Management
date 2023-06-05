import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import styles from '../../CSS/Button.Module.css'
import clsx from 'clsx';

export default function UpdateButton ({ onClick, text }) {
	return (
		<Stack spacing={2} direction="row" className={styles.buttonWrapper}>
			<Button
				variant="contained"
				className={clsx(styles.button, styles.updateButton)}
				onClick={onClick}>{text}</Button>
		</Stack>
	);
}

UpdateButton.propTypes = {
	onClick: PropTypes.func,
	text: PropTypes.string
};
