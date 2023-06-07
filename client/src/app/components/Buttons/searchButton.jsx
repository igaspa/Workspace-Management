import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from '../../CSS/Button.Module.css';

export default function SearchButton({ onClick, text, disabled }) {
  return (
    <Stack spacing={2} direction="row" className={styles.buttonWrapper}>
      <Button
        variant="contained"
        className={clsx(styles.button, styles.searchButton)}
        onClick={onClick}
        disabled={disabled}
      >
        {text}
      </Button>
    </Stack>
  );
}

SearchButton.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string,
  disabled: PropTypes.bool
};
