import { CircularProgress, Typography, Grid, Box, TextField, Container } from '@mui/material';
import { useGetLocationListQuery, useDeleteLocationMutation, useUpdateLocationMutation, useGetLocationSearchListQuery } from '../../../api/locationApiSlice';
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
		id: 'address',
		label: 'Address',
		minWidth: 170,
		align: 'left'
	},
	{
		id: 'city',
		label: 'City',
		minWidth: 170,
		align: 'left'
	},
	{
		id: 'country',
		label: 'Country',
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

export default function LocationTable () {
	const role = localStorage.getItem('role');
	const navigate = useNavigate();
	const [deleteLocation] = useDeleteLocationMutation();
	const [updateLocation] = useUpdateLocationMutation();
	const [openDelete, setOpenDelete] = useState(false);
	const [openUpdate, setOpenUpdate] = useState(false);
	const [selectedId, setSelectedId] = useState(' ');
	const [formData, setFormData] = useState('');
	const [page, setPage] = useState(0);
	const [size, setSize] = useState(10);
	const [searchData, setSearchData] = useState('');
	const [searchTerm, setSearchTerm] = useState('');
	const divRef = useRef();
	const searchRef = useRef();

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};
	const handleChangeRowsPerPage = (event) => {
		setSize(+event.target.value);
		setPage(0);
	};

	const handleCreateClick = () => {
		navigate('/backoffice/create-location');
	};

	const handleSearch = (event) => {
		const searchField = new FormData(searchRef.current);
		setSearchTerm(searchField.get('location'));
	};

	const handleSearchTerm = (event) => {
		setSearchData(event.target.value);
	};

	const handleSearchClear = (event) => {
		searchRef.current.reset();
		setSearchTerm('');
		setSearchData('');
	};

	const handleClickOpenDelete = (locationId) => {
		setSelectedId(locationId);
		setOpenDelete(true);
	};

	const handleClickOpenUpdate = (locationId) => {
		const chosenLocation = data.find(el => el.id === locationId);
		setFormData(chosenLocation);
		setSelectedId(locationId);
		setOpenUpdate(true);
	};

	const handleClose = () => {
		setOpenUpdate(false);
		setOpenDelete(false);
	};
	const { data: [location, pages] = [], isError: isLocationsError, isLoading: isLocationsLoading } = useGetLocationListQuery({
		...(page && { page: page + 1 }),
		...(size && { size })
	});
	const { data: searchLocation = [], isError: isLocationSearchError, isLoading: isLocationSearchLoading } = useGetLocationSearchListQuery({
		name: [searchTerm],
		...(page && { page: page + 1 }),
		...(size && { size })
	});

	const handleDeleteClick = async (event) => {
		event.preventDefault();
		await deleteLocation(selectedId)
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
			...(data.get('address') && { address: data.get('address') }),
			...(data.get('city') && { city: data.get('city') }),
			...(data.get('country') && { country: data.get('country') })
		};
		await updateLocation({
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
	const filteredData = searchTerm.length >= 3 ? searchLocation.filter(item => item.address.toLowerCase().includes(searchTerm.toLowerCase())) : location;

	const data = filteredData?.map((el) => ({
		id: el.id,
		address: el.address,
		city: el.city,
		country: el.country,
		actions: <div style={{ display: 'flex', flexDirection: 'row', padding: 1, justifyContent: 'center' }}>
			<UpdateButton onClick={() => handleClickOpenUpdate(el.id)} text={'Update'} />
			<DeleteButton onClick={() => handleClickOpenDelete(el.id)} text={'Remove'} />
		</div>
	}));

	return (
		<Container maxWidth="lg">
			{ role.includes('Administrator')
				? isLocationsLoading || isLocationSearchLoading
					? (
						<CircularProgress />
					)
					: isLocationsError || isLocationSearchError
						? (
							<Typography color="error">Failed to load location.</Typography>
						)
						: (<>
							<Grid component="form" ref={searchRef}
								container alignItems='center' paddingBottom={1}
							>
								<SearchField
									data={searchLocation.map(item => item.name)}
									name="location"
									onChange={handleSearchTerm} />
								<SearchButton onClick={handleSearch}
									text={'Search'}
									disabled={(searchData?.length < 3)}/>
								<DeleteButton onClick={handleSearchClear}
									text={'Clear'} />
								<CreateButton onClick={handleCreateClick}
									text={'Create Location'}/>

							</Grid>
							<DefaultTable
								columns={columns}
								rows={data}
								page={page}
								count={count}
								rowsPerPage={size}
								handleChangePage={handleChangePage}
								handleChangeRowsPerPage={handleChangeRowsPerPage}
								rowsPerPageOptions={[10, 25, 50, 100]}/>
							<Prompt open={openDelete}
								onClose={handleClose}
								title={'Remove Location'}
								body={'Are you sure you want to remove this location?'}
								handleCancel={handleClose}
								handleConfirm={handleDeleteClick} />

							<Prompt open={openUpdate}
								onClose={handleClose}
								title={'Update Location'}
								body={<Box
									component="form" ref={divRef} noValidate sx={{ mt: 1 }}>
									<TextField
										margin="normal"
										fullWidth
										defaultValue={formData.address || ' '}
										id="location"
										label="Location Address"
										name="address"
									/>
									<TextField
										margin="normal"
										fullWidth
										defaultValue={formData.city || ' '}
										id="location"
										label="City"
										name="city"
									/>
									<TextField
										margin="normal"
										fullWidth
										defaultValue={formData.country || ' '}
										id="location"
										label="Country"
										name="country"
									/></Box>}
								handleCancel={handleClose}
								handleConfirm={handleUpdateClick} />
						</>
						)
				: navigate('/')}
		</Container>
	);
}
