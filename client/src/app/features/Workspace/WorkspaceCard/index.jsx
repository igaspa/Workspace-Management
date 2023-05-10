import PropTypes from 'prop-types';
import { useState } from 'react';
import WorkspaceCard from '../../../components/Workspace/workspaceCard';

const Workspace = ({ workspace, handleDrawerOpen, handlePermanentDrawerOpen, startHour, date, endHour, handleMultipleDrawerOpen }) => {
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
		<WorkspaceCard workspace={workspace}
			date={date}
			open={open}
			openPermanent={openPermanent}
			openMultiple={openMultiple}
			startTime={startHour}
			endTime={endHour}
			handleDrawerClose={handleDrawerClose}
			handleDrawerOpen={handleDrawerOpen}
			handlePermanentDrawerOpen={handlePermanentDrawerOpen}
			handleMultipleDrawerOpen= {handleMultipleDrawerOpen}/>
	);
};

Workspace.propTypes = {
	workspace: PropTypes.object,
	handleDrawerOpen: PropTypes.func,
	startHour: PropTypes.string,
	endHour: PropTypes.string,
	date: PropTypes.string,
	handlePermanentDrawerOpen: PropTypes.func,
	handleMultipleDrawerOpen: PropTypes.func
};

export default Workspace;
