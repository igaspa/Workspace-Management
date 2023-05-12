import { useState, useRef } from 'react';
import { CircularProgress, Typography, Box, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@mui/material';
import { successToast } from '../../../utils/toastifyNotification';
import { errorHandler } from '../../../utils/errors';
import { useDeleteEquipmentMutation, useGetEquipmentsListQuery, useUpdateEquipmentMutation } from '../../../api/equipmentApiSlice';
import Paper from '@mui/material/Paper';

const Equipment = () => {
	const [deleteEquipment] = useDeleteEquipmentMutation();
	const [updateEquipment] = useUpdateEquipmentMutation();
	const [openDelete, setOpenDelete] = useState(false);
	const [openUpdate, setOpenUpdate] = useState(false);
	const [selectedId, setSelectedId] = useState(' ');
	const divRef = useRef();

	const handleClickOpenDelete = (equipmentId) => {
		setSelectedId(equipmentId);
		setOpenDelete(true);
	};

	const handleClickOpenUpdate = (equipmentId) => {
		setSelectedId(equipmentId);
		setOpenUpdate(true);
	};

	const handleClose = () => {
		setOpenUpdate(false);
		setOpenDelete(false);
	};

	const { data: [equipment] = [], isError: isEquipmentsError, isLoading: isEquipmentsLoading } = useGetEquipmentsListQuery({
		include: ['equipmentType', 'equipment']
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

	return (
		<div>
			{isEquipmentsLoading
				? (
					<CircularProgress />
				)
				: isEquipmentsError
					? (
						<Typography color="error">Failed to load equipment.</Typography>
					)
					: (
						<main>
							<Box
								spacing={2}
								direction="row"
								flexWrap="wrap"
								margin={0}
								padding={0}
							>
								<Box spacing={1} direction="row" flexWrap="wrap" margin={0} minWidth="400">
									{equipment.length
										? (
											<>
												<TableContainer component={Paper} sx={{ minWidth: 320 }}>
													<Table>
														<TableHead>
															<TableRow>
																<TableCell>Name</TableCell>
															</TableRow>
														</TableHead>
														<TableBody>
															{equipment.map((equipment) => (
																<TableRow key={equipment.id}>
																	<TableCell>{equipment.name}</TableCell>
																	<TableCell align='center'>
																		<Button
																			variant="contained"
																			size="small"
																			color="primary"
																			onClick={() => handleClickOpenUpdate(equipment.id)}
																			sx={{ marginLeft: 2, fontSize: 11 }}
																		>
																			<strong>Update</strong>
																		</Button>
																		<Button
																			variant="contained"
																			size="small"
																			cursor="pointer"
																			onClick={() => handleClickOpenDelete(equipment.id)}
																			sx={{
																				marginLeft: 2,
																				background: '#ba000d',
																				fontSize: 11,
																				':hover': {
																					background: '#ff7961'
																				}
																			}}
																		>
																			<strong>Delete</strong>
																		</Button>

																	</TableCell>

																</TableRow>

															))}

															<Dialog open={openDelete} onClose={handleClose}>
																<DialogTitle>Delete Equipment</DialogTitle>
																<DialogContent>
																	<DialogContentText>
																					Are you sure you want to delete this equipment?
																	</DialogContentText>
																</DialogContent>
																<DialogActions>
																	<Button onClick={handleDeleteClick} autoFocus>Delete</Button>
																	<Button onClick={handleClose}>Cancel</Button>
																</DialogActions>
															</Dialog>
															<Dialog open={openUpdate} onClose={handleClose}>
																<DialogTitle>Update Equipment</DialogTitle>
																<DialogContent>
																	<DialogContentText>
																					Update Equipment name:
																	</DialogContentText>
																</DialogContent>
																<DialogContent>
																	<Box component="form" ref={divRef} noValidate sx={{ mt: 1 }}>
																		<TextField
																			margin="normal"
																			required
																			fullWidth
																			id="equipment"
																			label="Equipment Name"
																			name="equipment"
																		/></Box>
																</DialogContent>
																<DialogActions>
																	<Button onClick={handleUpdateClick} autoFocus>Update</Button>
																	<Button onClick={handleClose}>Cancel</Button>
																</DialogActions>
															</Dialog>
														</TableBody>
													</Table>
												</TableContainer>
											</>
										)
										: (
											'There are no equipment...'
										)}
								</Box>
							</Box>
						</main>)
			}

		</div>
	);
};

export default Equipment;
