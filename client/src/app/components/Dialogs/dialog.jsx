import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  useMediaQuery,
  useTheme
} from '@mui/material';

import CancelButton from '../Buttons/cancelButton';
import ConfirmButton from '../Buttons/confirmButton';

export default function Prompt({ open, title, body, onClose, handleCancel, handleConfirm }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Dialog open={open} onClose={onClose} fullScreen={fullScreen}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText component={'div'}>{body}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <ConfirmButton onClick={handleConfirm} text={'Confirm'} />
        <CancelButton onClick={handleCancel} autoFocus text={'Cancel'} />
      </DialogActions>
    </Dialog>
  );
}

Prompt.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string,
  body: PropTypes.any,
  onClose: PropTypes.func,
  handleCancel: PropTypes.func,
  handleConfirm: PropTypes.func,
  text: PropTypes.string
};
