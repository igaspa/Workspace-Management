import PropTypes from 'prop-types';
import { useState } from 'react';
import WorkspaceCard from '../../../components/Workspace/workspaceCard';

const Workspace = ({ image, workspace, handleDrawerOpen, startHour, endHour, fromDate, untilDate }) => {
	const [open, setOpen] = useState(false);

	// open drawer for reservation
	handleDrawerOpen = () => {
		setOpen(true);
	};

	// close drawer
	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<WorkspaceCard
			image = {image}
			workspace={workspace}
			fromDate={fromDate}
			untilDate={untilDate}
			open={open}
			startHour={startHour}
			endHour={endHour}
			handleDrawerClose={handleDrawerClose}
			handleDrawerOpen={handleDrawerOpen}
		/>
	);
};

Workspace.propTypes = {
	workspace: PropTypes.object,
	handleDrawerOpen: PropTypes.func,
	startHour: PropTypes.string,
	endHour: PropTypes.string,
	fromDate: PropTypes.string,
	untilDate: PropTypes.string,
	image: PropTypes.string,
	handlePermanentDrawerOpen: PropTypes.func,
	handleMultipleDrawerOpen: PropTypes.func
};

export default Workspace;
