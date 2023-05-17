import { CircularProgress, Typography, Box, TextField } from '@mui/material';
import { useGetWorkspaceTypesListQuery, useUpdateWorkspaceTypeMutation, useDeleteWorkspaceTypeMutation } from '../../../api/workspaceTypeApiSlice';
import { useNavigate } from 'react-router-dom';
import DeleteButton from '../../../components/Buttons/deleteButton';
import UpdateButton from '../../../components/Buttons/updateButton';
import { successToast } from '../../../utils/toastifyNotification';
import { errorHandler } from '../../../utils/errors';
import { useState, useRef } from 'react';
import Prompt from '../../../components/Dialogs/dialog';
import CreateButton from '../../../components/Buttons/createButton';
import DefaultTable from '../../../components/Backoffice/table';

const columns = [
	{
		id: 'name',
		label: 'Name',
		minWidth: 170,
		align: 'left'
	},
	{
		id: 'maxReservationInterval',
		label: 'Max Reservation Interval',
		minWidth: 170,
		align: 'left'
	},
	{
		id: 'maxReservationWindow',
		label: 'Max Reservation Window',
		minWidth: 170,
		align: 'left'
	},
	{
		id: 'allowPermanentReservations',
		label: 'Allow Permanent Reservations',
		minWidth: 170,
		align: 'left'
	},
	{
		id: 'actions',
		label: 'Actions',
		minWidth: 170,
		align: 'center'
	}
];

export default function WorkspaceTypeTable () {
	const [deleteWorkspaceType] = useDeleteWorkspaceTypeMutation();
	const [updateWorkspaceType] = useUpdateWorkspaceTypeMutation();
	const navigate = useNavigate();
	const role = localStorage.getItem('role');
	const [openDelete, setOpenDelete] = useState(false);
	const [openUpdate, setOpenUpdate] = useState(false);
	const [selectedId, setSelectedId] = useState(' ');
	const [formData, setFormData] = useState('');
	const [page, setPage] = useState(0);
	const [size, setSize] = useState(10);
	const divRef = useRef();

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};
	const handleChangeRowsPerPage = (event) => {
		setSize(+event.target.value);
		setPage(0);
	};

	const handleCreateClick = (workspaceTypeId) => {
		navigate('/backoffice/create-workspace-type');
	};

	const handleClickOpenDelete = (workspaceTypeId) => {
		setSelectedId(workspaceTypeId);
		setOpenDelete(true);
	};

	const handleClickOpenUpdate = (workspaceTypeId) => {
		const chosenWorkspaceType = displayedData.find(el => el.id === workspaceTypeId);
		setFormData(chosenWorkspaceType);
		setSelectedId(workspaceTypeId);
		setOpenUpdate(true);
	};

	const handleClose = () => {
		setOpenUpdate(false);
		setOpenDelete(false);
	};
	const { data: [workspaceType, pages] = [], isError: isWorkspaceTypesError, isLoading: isWorkspaceTypesLoading } = useGetWorkspaceTypesListQuery({
		...(page && { page: page + 1 }),
		...(size && { size })
	});
	const handleDeleteClick = async (event) => {
		event.preventDefault();
		await deleteWorkspaceType(selectedId)
			.unwrap()
			.then((response) => {
				handleClose();
				successToast(response.message);
			})
			.catch((error) => {
				handleClose();
				errorHandler(error);
			});
	};

	const handleUpdateClick = async (event) => {
		event.preventDefault();
		const data = new FormData(divRef.current);
		const objectToUpdate = {
			...(data.get('workspaceType') && { name: data.get('workspaceType') }),
			...(data.get('maxReservationInterval') && { maxReservationInterval: data.get('maxReservationInterval') }),
			...(data.get('maxReservationWindow') && { maxReservationWindow: `${data.get('maxReservationWindow')} days` }),
			...(data.get('allowPermanentReservations') && { allowPermanentReservations: data.get('allowPermanentReservations') })
		};

		await updateWorkspaceType({
			id: selectedId,
			body: objectToUpdate
		})
			.unwrap()
			.then((response) => {
				handleClose();
				successToast(response.message);
			})
			.catch((error) => {
				handleClose();
				errorHandler(error);
			});
	};

	const count = pages * size;
	const displayedData = workspaceType?.map((el) => ({
		id: el.id,
		name: el.name,
		maxReservationInterval: el.maxReservationInterval.hours,
		maxReservationWindow: el.maxReservationWindow.days,
		allowPermanentReservations: el.allowPermanentReservations.toString(),
		actions: <div style={{ display: 'flex', flexDirection: 'row' }}>
			<UpdateButton onClick={() => handleClickOpenUpdate(el.id)} text={'Update'} />
			<DeleteButton onClick={() => handleClickOpenDelete(el.id)} text={'Remove'} />
		</div>
	}));
	return (
		<div>
			{ role.includes('Administrator')
				? isWorkspaceTypesLoading
					? (
						<CircularProgress />
					)
					: isWorkspaceTypesError
						? (
							<Typography color="error">Failed to load workspace types.</Typography>
						)
						: (<>
							<CreateButton onClick={handleCreateClick} text={'Create new Workspace Type'} />
							<DefaultTable
								columns={columns}
								rows={displayedData}
								page={page}
								count={count}
								rowsPerPage={size}
								handleChangePage={handleChangePage}
								handleChangeRowsPerPage={handleChangeRowsPerPage}
								rowsPerPageOptions={[10, 25, 50, 100]}/>
							<Prompt open={openDelete}
								onClose={handleClose}
								title={'Remove Workspace Type'}
								body={'Are you sure you want to remove this workspace type?'}
								handleCancel={handleClose}
								handleConfirm={handleDeleteClick} />
							<Prompt open={openUpdate}
								onClose={handleClose}
								title={'Update Workspace Type'}
								body={<Box
									component="form" ref={divRef} noValidate sx={{ mt: 1 }}>
									<TextField
										margin="normal"
										fullWidth
										value={formData.name || ''}
										id="workspaceType"
										label="WorkspaceType Name"
										name="workspaceType"
									/>
									<TextField
										margin="normal"
										fullWidth
										id="workspaceType"
										label="Max Reservation Interval"
										name="maxReservationInterval"
										defaultValue="hh:mm"
									/>
									<TextField
										fullWidth
										margin="normal"
										id="workspaceType"
										label="Max Reservation Window"
										name="maxReservationWindow"
										defaultValue={1}
										type="number"
										inputProps={{ min: 1 }}
									/>
									<TextField
										margin="normal"
										fullWidth
										id="workspaceType"
										value={formData.allowPermanentReservations || ''}
										label="Allow Permanent Reservations"
										name="allowPermanentReservations"
									/></Box>}
								handleCancel={handleClose}
								handleConfirm={handleUpdateClick} />
						</>
						)
				: navigate('/')}
		</div>
	);
}
