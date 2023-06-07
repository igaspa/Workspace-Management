import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from '../../CSS/Button.Module.css';

export default function ConfirmButton({ onClick, text, type }) {
  return (
    <Stack spacing={2} direction="row" className={styles.buttonWrapper}>
      <Button variant="contained" className={clsx(styles.button, styles.confirmButton)} type={type} onClick={onClick}>
        {text}
      </Button>
    </Stack>
  );
}

ConfirmButton.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string,
  type: PropTypes.string
};
