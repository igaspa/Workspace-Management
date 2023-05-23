import { CircularProgress, Typography, Box, TextField } from '@mui/material';
import { useGetEquipmentsListQuery, useDeleteEquipmentMutation, useUpdateEquipmentMutation, useGetEquipmentSearchListQuery } from '../../../api/equipmentApiSlice';
import { useNavigate } from 'react-router-dom';
import DefaultTable from '../../../components/Backoffice/table';
import DeleteButton from '../../../components/Buttons/deleteButton';
import UpdateButton from '../../../components/Buttons/updateButton';
import { successToast } from '../../../utils/toastifyNotification';
import { errorHandler } from '../../../utils/errors';
import { useState, useRef } from 'react';
import Prompt from '../../../components/Dialogs/dialog';
import CreateButton from '../../../components/Buttons/createButton';
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
		id: 'actions',
		label: 'Actions',
		minWidth: 170,
		align: 'center'
	}
];

export default function EquipmentTable () {
	const role = localStorage.getItem('role');
	const navigate = useNavigate();
	const [deleteEquipment] = useDeleteEquipmentMutation();
	const [updateEquipment] = useUpdateEquipmentMutation();
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
	const handleSearch = (event) => {
		const searchField = new FormData(searchRef.current);
		setSearchTerm(searchField.get('equipment'));
	};

	const handleSearchTerm = (event) => {
		setSearchData(event.target.value);
	};

	const handleSearchClear = (event) => {
		searchRef.current.reset();
		setSearchTerm('');
		setSearchData('');
	};

	const handleCreateClick = () => {
		navigate('/backoffice/create-equipment');
	};

	const handleClickOpenDelete = (equipmentId) => {
		setSelectedId(equipmentId);
		setOpenDelete(true);
	};

	const handleClickOpenUpdate = (equipmentId) => {
		const chosenEquipment = data.find(el => el.id === equipmentId);
		setFormData(chosenEquipment);
		setSelectedId(equipmentId);
		setOpenUpdate(true);
	};

	const handleClose = () => {
		setOpenUpdate(false);
		setOpenDelete(false);
	};

	const { data: [equipment, pages] = [], isError: isEquipmentsError, isLoading: isEquipmentsLoading } = useGetEquipmentsListQuery({
		...(page && { page: page + 1 }),
		...(size && { size })
	});

	const { data: searchEquipment = [], isError: isEquipmentSearchError, isLoading: isEquipmentSearchLoading } = useGetEquipmentSearchListQuery({
		name: [searchTerm]
	});

	const handleDeleteClick = async (event) => {
		event.preventDefault();
		await deleteEquipment(selectedId)
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
		await updateEquipment({
			id: selectedId,
			body: {
				name: data.get('equipment')
			}
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
	const filteredData = searchTerm.length >= 3 ? searchEquipment.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase())) : equipment;

	const data = filteredData?.map((el) => ({
		id: el.id,
		name: el.name,
		actions: (
			<div style={{ display: 'flex', flexDirection: 'row' }}>
				<UpdateButton onClick={() => handleClickOpenUpdate(el.id)} text={'Update'} />
				<DeleteButton onClick={() => handleClickOpenDelete(el.id)} text={'Remove'} />
			</div>
		)
	}));

	return (
		<div>
			{ role.includes('Administrator')
				? isEquipmentsLoading || isEquipmentSearchLoading
					? (
						<CircularProgress />
					)
					: isEquipmentsError || isEquipmentSearchError
						? (
							<Typography color="error">Failed to load equipment.</Typography>
						)
						: (<>
							<Box component="form" ref={searchRef}
								sx={{
									display: 'flex',
									alignItem: 'center',
									paddingBottom: 1
								}}>
								<SearchField
									data={searchEquipment.map(item => item.name)}
									name="equipment"
									onChange={handleSearchTerm} />
								<SearchButton onClick={handleSearch}
									text={'Search'}
									disabled={(searchData?.length < 3)}/>
								<DeleteButton onClick={handleSearchClear}
									text={'Clear'} />
								<CreateButton onClick={handleCreateClick}
									text={'Create Equipment'} />
							</Box>
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
								title={'Remove Equipment'}
								body={'Are you sure you want to remove this equipment?'}
								handleCancel={handleClose}
								handleConfirm={handleDeleteClick} />
							<Prompt open={openUpdate}
								onClose={handleClose}
								title={'Update Equipment'}
								body={<Box
									component="form" ref={divRef} noValidate sx={{ mt: 1 }}>
									<TextField
										margin="normal"
										required
										fullWidth
										defaultValue={formData.name || ''}
										id="equipment"
										label="Equipment Name"
										name="equipment"
									/></Box>}
								handleCancel={handleClose}
								handleConfirm={handleUpdateClick} />
						</>
						)
				: navigate('/')}
		</div>
	);
}
