import { CircularProgress, Typography, Box, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useGetAreaListQuery, useDeleteAreaMutation, useUpdateAreaMutation } from '../../../api/areaApiSlice';
import { useNavigate } from 'react-router-dom';
import DeleteButton from '../../../components/Buttons/deleteButton';
import UpdateButton from '../../../components/Buttons/updateButton';
import { successToast } from '../../../utils/toastifyNotification';
import { errorHandler } from '../../../utils/errors';
import { useState, useRef } from 'react';
import Prompt from '../../../components/Dialogs/dialog';
import CreateButton from '../../../components/Buttons/createButton';
import DefaultTable from '../../../components/Backoffice/table';
import { useGetLocationListQuery } from '../../../api/locationApiSlice';
import ImagePrompt from '../../../components/Dialogs/imageDialog';

const columns = [
	{
		id: 'name',
		label: 'Name',
		minWidth: 170,
		align: 'left'
	},
	{
		id: 'floor',
		label: 'Floor',
		minWidth: 170,
		align: 'center'
	},
	{
		id: 'location',
		label: 'Location',
		minWidth: 170,
		align: 'center'
	}, {
		id: 'image',
		label: 'Image',
		minWidth: 170,
		align: 'center'
	},
	{
		id: 'actions',
		label: 'Actions',
		minWidth: 170,
		align: 'center'
	}
];

export default function AreaTable () {
	const role = localStorage.getItem('role');
	const navigate = useNavigate();
	const [deleteArea] = useDeleteAreaMutation();
	const [updateArea] = useUpdateAreaMutation();
	const [openDelete, setOpenDelete] = useState(false);
	const [openUpdate, setOpenUpdate] = useState(false);
	const [openImage, setOpenImage] = useState(false);
	const [selectedId, setSelectedId] = useState(' ');
	const [areaImage, setAreaImage] = useState('');
	const divRef = useRef();
	const [page, setPage] = useState(0);
	const [size, setSize] = useState(10);
	const [formData, setFormData] = useState('');

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};
	const handleChangeRowsPerPage = (event) => {
		setSize(+event.target.value);
		setPage(0);
	};

	const handleCreateClick = () => {
		navigate('/backoffice/create-area');
	};

	const handleClickOpenDelete = (areaId) => {
		setSelectedId(areaId);
		setOpenDelete(true);
	};

	const handleLocationChange = (event) => {
		const value = event.target.value;
		const name = event.target.name;
		setFormData((prevState) => ({
			...prevState,
			[name]: value
		}));
	};

	const handleClickOpenUpdate = (areaId) => {
		const chosenArea = data.find(el => el.id === areaId);
		setFormData(chosenArea);
		setSelectedId(areaId);
		setOpenUpdate(true);
	};

	const handleImageOpen = () => {
		setOpenImage(true);
	};

	const handleClose = () => {
		setOpenUpdate(false);
		setOpenDelete(false);
		setOpenImage(false);
	};

	const handleDeleteClick = async (event) => {
		event.preventDefault();
		await deleteArea(selectedId)
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

	const { data: [area, pages] = [], isError: isAreasError, isLoading: isAreasLoading } = useGetAreaListQuery({
		...(page && { page: page + 1 }),
		...(size && { size })
	});

	const { data: [locations] = [], isError: isLocationsError, isLoading: isLocationsLoading } = useGetLocationListQuery({});

	const handleUpdateClick = async (event) => {
		event.preventDefault();
		const data = new FormData(divRef.current);
		const objectToUpdate = {
			...(data.get('name') && { name: data.get('name') }),
			...(data.get('floor') && { floor: data.get('floor') }),
			...(data.get('location') && { locationId: data.get('location') })
		};
		await updateArea({
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
	const data = area?.map((el) => {
		return {
			id: el.id,
			name: el.name,
			floor: el.floor,
			location: el.location.address,
			locationId: el.location.id,
			actions: <div style={{ display: 'flex', flexDirection: 'row' }}>
				<UpdateButton onClick={() => handleClickOpenUpdate(el.id)} text={'Update'} />
				<DeleteButton onClick={() => handleClickOpenDelete(el.id)} text={'Remove'} />
			</div>,
			image: <CreateButton onClick={async () => {
				setAreaImage(el.image);
				<CircularProgress />;
				handleImageOpen(el.image);
			}} text={'Image'} />
		};
	});
	return (
		<div>
			{ role.includes('Administrator')
				? isAreasLoading || isLocationsLoading
					? (
						<CircularProgress />
					)
					: isAreasError || isLocationsError
						? (
							<Typography color="error">Failed to load area.</Typography>
						)
						: (<>
							<CreateButton onClick={handleCreateClick} text={'Create Area'}/>
							<DefaultTable columns={columns}
								rows={data}
								page={page}
								count={count}
								rowsPerPage={size}
								handleChangePage={handleChangePage}
								handleChangeRowsPerPage={handleChangeRowsPerPage}
								rowsPerPageOptions={[10, 25, 50, 100]}/>
							<Prompt open={openDelete}
								onClose={handleClose}
								title={'Remove Area'}
								body={'Are you sure you want to remove this area?'}
								handleCancel={handleClose}
								handleConfirm={handleDeleteClick} />
							<ImagePrompt open={openImage}
								onClose={handleClose}
								title={'Area Image'}
								body={<Box
									component="img"
									sx={{
										height: '100%',
										width: '100%',
										paddingLeft: 1,
										paddingTop: 0.5
									}}
									alt='Area image'
									src={areaImage}
								/>}
								handleCancel={handleClose} />
							<Prompt open={openUpdate}
								onClose={handleClose}
								title={'Update Area'}
								body={<Box
									component="form" ref={divRef} noValidate sx={{ mt: 1 }}>
									<FormControl fullWidth>
										<InputLabel id="select-location">Select Location</InputLabel>
										<Select
											labelId="select-area"
											label="Select Location"
											sx={{ textAlign: 'left' }}
											onChange={handleLocationChange}
											defaultValue={formData.locationId || ''}
											name="location"
										>
											{locations.map((location) => (
												<MenuItem key={location.id} value={location.id}>
													{location.address}
												</MenuItem>
											))}
										</Select>
									</FormControl>
									<TextField
										margin="normal"
										fullWidth
										id="area"
										label="Area Name"
										name="name"
										defaultValue={formData.name || ''}
									/>
									<TextField
										margin="normal"
										fullWidth
										id="area"
										label="Area Floor"
										name="floor"
										defaultValue={formData.floor || ''}
									/>
									<TextField
										margin="normal"
										fullWidth
										id="area"
										label="Area Image"
										name="image"
										placeholder='Image Link'
									/>
								</Box>}
								handleCancel={handleClose}
								handleConfirm={handleUpdateClick} />
						</>
						)
				: navigate('/')}
		</div>
	);
}
