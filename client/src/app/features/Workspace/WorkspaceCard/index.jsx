import PropTypes from 'prop-types';
import { useState } from 'react';
import WorkspaceCard from '../../../components/Workspace/workspaceCard';

const Workspace = ({ image, workspace, handleDrawerOpen, handlePermanentDrawerOpen, startHour, endHour, handleMultipleDrawerOpen, fromDate, untilDate }) => {
	const [open, setOpen] = useState(false);
	const [openPermanent, setOpenPermanent] = useState(false);
	const [openMultiple, setOpenMultiple] = useState(false);

	// open drawer for reservation
	handleDrawerOpen = () => {
		setOpen(true);
	};

	handlePermanentDrawerOpen = () => {
		setOpenPermanent(true);
	};

	handleMultipleDrawerOpen = () => {
		setOpenMultiple(true);
	};

	// close drawer
	const handleDrawerClose = () => {
		setOpen(false);
		setOpenPermanent(false);
		setOpenMultiple(false);
	};

	return (
		<WorkspaceCard
			image = {image}
			workspace={workspace}
			fromDate={fromDate}
			untilDate={untilDate}
			open={open}
			openPermanent={openPermanent}
			openMultiple={openMultiple}
			startHour={startHour}
			endHour={endHour}
			handleDrawerClose={handleDrawerClose}
			handleDrawerOpen={handleDrawerOpen}
			handlePermanentDrawerOpen={handlePermanentDrawerOpen}
			handleMultipleDrawerOpen= {handleMultipleDrawerOpen}
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
