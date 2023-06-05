import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './Button.module.css'

export default function CreateButton ({ onClick, text }) {
	return (
		<Stack spacing={2} direction="row" className={styles.buttonWrapper}>
			<Button
				variant="contained"
				className={clsx(styles.createButton, styles.button)}
				onClick={onClick}>{text}</Button>
		</Stack>
	);
}

CreateButton.propTypes = {
	onClick: PropTypes.func,
	text: PropTypes.string
};
