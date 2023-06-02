import { CircularProgress, Typography, Box, Grid, TextField, Checkbox, Container } from '@mui/material';
import { useGetWorkspaceTypesListQuery, useUpdateWorkspaceTypeMutation, useDeleteWorkspaceTypeMutation, useGetWorkspaceTypeSearchListQuery } from '../../../api/workspaceTypeApiSlice';
import { useNavigate } from 'react-router-dom';
import DeleteButton from '../../../components/Buttons/deleteButton';
import UpdateButton from '../../../components/Buttons/updateButton';
import { successToast } from '../../../utils/toastifyNotification';
import { errorHandler } from '../../../utils/errors';
import { useState, useRef } from 'react';
import Prompt from '../../../components/Dialogs/dialog';
import CreateButton from '../../../components/Buttons/createButton';
import DefaultTable from '../../../components/Backoffice/table';
import SearchButton from '../../../components/Buttons/searchButton';
import SearchField from '../../../components/Filters/searchField';

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
	const [searchData, setSearchData] = useState('');
	const [searchTerm, setSearchTerm] = useState('');
	const searchRef = useRef();
	const divRef = useRef();
	const [allowPermanentReservation, setAllowPermanentReservation] = useState(false);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};
	const handleChangeRowsPerPage = (event) => {
		setSize(+event.target.value);
		setPage(0);
	};

	const handleCreateClick = () => {
		navigate('/backoffice/create-workspace-type');
	};

	const handleSearch = (event) => {
		const searchField = new FormData(searchRef.current);
		setSearchTerm(searchField.get('workspaceType'));
	};

	const handleSearchTerm = (event) => {
		event.preventDefault();
		setSearchData(event.target.value);
	};

	const handleSearchClear = (event) => {
		searchRef.current.reset();
		setSearchTerm('');
		setSearchData('');
	};

	const handleClickOpenDelete = (workspaceTypeId) => {
		setSelectedId(workspaceTypeId);
		setOpenDelete(true);
	};

	const handleClickOpenUpdate = (workspaceTypeId) => {
		const chosenWorkspaceType = data.find(el => {
			return (el.id === workspaceTypeId);
		});
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

	const { data: searchWorkspaceType = [], isError: isWorkspaceTypeSearchError, isLoading: isWorkspaceTypeSearchLoading } = useGetWorkspaceTypeSearchListQuery({
		name: [searchTerm],
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
			allowPermanentReservations: allowPermanentReservation
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

	const filteredData = searchTerm.length >= 3 ? searchWorkspaceType.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase())) : workspaceType;

	const data = filteredData?.map((el) => ({
		id: el.id,
		name: el.name,
		maxReservationInterval: `${el.maxReservationInterval.hours
			? el.maxReservationInterval.hours.toString().padStart(2, '0')
			: '00'}:${el.maxReservationInterval.minutes ? el.maxReservationInterval.minutes.toString().padStart(2, '0') : '00'}`,
		maxReservationWindow: `${el.maxReservationWindow.days} days`,
		allowPermanentReservations: el.allowPermanentReservations.toString(),
		actions: <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
			<UpdateButton onClick={() => handleClickOpenUpdate(el.id)} text={'Update'} />
			<DeleteButton onClick={() => handleClickOpenDelete(el.id)} text={'Remove'} />
		</div>
	}));

	return (
		<Container maxWidth="lg">
			{role.includes('Administrator')
				? (
					<>
						{isWorkspaceTypesLoading || isWorkspaceTypeSearchLoading
							? (
								<CircularProgress />
							)
							: isWorkspaceTypesError || isWorkspaceTypeSearchError
								? (
									<Typography color="error">Failed to load workspace types.</Typography>
								)
								: (
									<>
										<Grid component="form" ref={searchRef}
											container alignItems='center' paddingBottom={1}
										>
											<SearchField
												data={searchWorkspaceType.map(item => item.name)}
												name="workspaceType"
												onChange={handleSearchTerm} />
											<SearchButton onClick={handleSearch}
												text={'Search'}
												disabled={(searchData?.length < 3)}/>
											<DeleteButton onClick={handleSearchClear}
												text={'Clear'} />
											<CreateButton onClick={handleCreateClick} text={'Create new Workspace Type'} />
										</Grid>
										<DefaultTable
											columns={columns}
											rows={data}
											page={page}
											count={count}
											rowsPerPage={size}
											handleChangePage={handleChangePage}
											handleChangeRowsPerPage={handleChangeRowsPerPage}
											rowsPerPageOptions={[10, 25, 50, 100]}
										/>
										<Prompt
											open={openDelete}
											onClose={handleClose}
											title={'Remove Workspace Type'}
											body={'Are you sure you want to remove this workspace type?'}
											handleCancel={handleClose}
											handleConfirm={handleDeleteClick}
										/>
										<Prompt
											open={openUpdate}
											onClose={handleClose}
											title={'Update Workspace Type'}
											body={
												<Box component="form" ref={divRef} noValidate sx={{ mt: 1 }}>
													<TextField
														margin="normal"
														fullWidth
														defaultValue={formData.name || ''}
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
														defaultValue={formData.maxReservationInterval || ''}
													/>
													<TextField
														fullWidth
														margin="normal"
														id="workspaceType"
														label="Max Reservation Window(days)"
														name="maxReservationWindow"
														defaultValue={1}
														type="number"
														inputProps={{ min: 1 }}
													/>
													<Box sx={{ display: 'flex', alignItems: 'center' }}>
														<Checkbox
															id="allowPermanentReservations"
															defaultChecked={formData.allowPermanentReservations === 'true'}
															onChange={(event) => setAllowPermanentReservation(event.target.checked)}
														/>
														<label htmlFor="allowPermanentReservations">Allow Permanent Reservations</label>
													</Box>
												</Box>
											}
											handleCancel={handleClose}
											handleConfirm={handleUpdateClick}
										/>
									</>
								)}
					</>
				)
				: (
					navigate('/')
				)}
		</Container>
	);
}
