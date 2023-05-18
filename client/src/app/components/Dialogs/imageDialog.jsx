import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, useMediaQuery, useTheme } from '@mui/material';

import CancelButton from '../Buttons/cancelButton';

export default function ImagePrompt ({ open, title, body, onClose, handleCancel }) {
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
	return (
		<Dialog open={open} onClose={onClose} fullScreen={fullScreen} >
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>
				<DialogContentText component={'div'}>
					{body}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<CancelButton onClick={handleCancel} autoFocus text={'Cancel'}/>
			</DialogActions>
		</Dialog>
	);
}

ImagePrompt.propTypes = {
	open: PropTypes.bool,
	title: PropTypes.string,
	body: PropTypes.any,
	onClose: PropTypes.func,
	handleCancel: PropTypes.func,
	text: PropTypes.string
};
