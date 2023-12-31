import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from '../../CSS/Button.Module.css';

export default function DeleteButton({ onClick, text }) {
  return (
    <Stack spacing={2} direction="row" className={styles.buttonWrapper}>
      <Button variant="contained" className={clsx(styles.deleteButton, styles.button)} onClick={onClick}>
        {text}
      </Button>
    </Stack>
  );
}

DeleteButton.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string
};
