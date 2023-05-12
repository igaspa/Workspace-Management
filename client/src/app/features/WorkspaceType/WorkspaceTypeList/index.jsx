import { useState, useRef } from 'react';
import { CircularProgress, Typography, Box, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@mui/material';
import { successToast } from '../../../utils/toastifyNotification';
import { errorHandler } from '../../../utils/errors';
import { useGetWorkspaceTypesListQuery, useUpdateWorkspaceTypeMutation, useDeleteWorkspaceTypeMutation } from '../../../api/workspaceTypeApiSlice';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';

const WorkspaceType = () => {
	const [deleteWorkspaceType] = useDeleteWorkspaceTypeMutation();
	const [updateWorkspaceType] = useUpdateWorkspaceTypeMutation();
	const [openDelete, setOpenDelete] = useState(false);
	const [openUpdate, setOpenUpdate] = useState(false);
	const [selectedId, setSelectedId] = useState(' ');
	const divRef = useRef();
	const navigate = useNavigate();

	const handleClickOpenDelete = (workspaceTypeId) => {
		setSelectedId(workspaceTypeId);
		setOpenDelete(true);
	};
	const handleCreateClick = (workspaceTypeId) => {
		navigate('/backoffice/create-workspace-type');
	};

	const handleClickOpenUpdate = (workspaceTypeId) => {
		setSelectedId(workspaceTypeId);
		setOpenUpdate(true);
	};

	const handleClose = () => {
		setOpenUpdate(false);
		setOpenDelete(false);
	};

	const { data: [workspaceType] = [], isError: isWorkspaceTypesError, isLoading: isWorkspaceTypesLoading } = useGetWorkspaceTypesListQuery();

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
			...(data.get('maxReservationWindow') && { maxReservationWindow: data.get('maxReservationWindow') }),
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

	return (
		<div>
			{isWorkspaceTypesLoading
				? (
					<CircularProgress />
				)
				: isWorkspaceTypesError
					? (
						<Typography color="error">Failed to load workspace types.</Typography>
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
									<Button onClick={handleCreateClick}>Create workspace type</Button>
									{workspaceType.length
										? (
											<>
												<TableContainer component={Paper} sx={{ minWidth: 320 }}>
													<Table>
														<TableHead>
															<TableRow>
																<TableCell>Name</TableCell>
																<TableCell>Max Reservation Interval (hours)</TableCell>
																<TableCell>Max Reservation Window (days) </TableCell>
																<TableCell>Allow Permanent Reservations</TableCell>
															</TableRow>
														</TableHead>
														<TableBody>
															{workspaceType.map((workspaceType) => {
																return (
																	<TableRow key={workspaceType.id}>
																		<TableCell>{workspaceType.name}</TableCell>
																		<TableCell>{workspaceType.maxReservationInterval.hours}</TableCell>
																		<TableCell>{workspaceType.maxReservationWindow.days}</TableCell>
																		<TableCell>{workspaceType.allowPermanentReservations.toString()}</TableCell>
																		<TableCell align='center'>
																			<Button
																				variant="contained"
																				size="small"
																				color="primary"
																				onClick={() => handleClickOpenUpdate(workspaceType.id)}
																				sx={{ marginLeft: 2, fontSize: 11 }}
																			>
																				<strong>Update</strong>
																			</Button>
																			<Button
																				variant="contained"
																				size="small"
																				cursor="pointer"
																				onClick={() => handleClickOpenDelete(workspaceType.id)}
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

																);
															})}

															<Dialog open={openDelete} onClose={handleClose}>
																<DialogTitle>Delete WorkspaceType</DialogTitle>
																<DialogContent>
																	<DialogContentText>
																					Are you sure you want to delete this workspace type?
																	</DialogContentText>
																</DialogContent>
																<DialogActions>
																	<Button onClick={handleDeleteClick} autoFocus>Delete</Button>
																	<Button onClick={handleClose}>Cancel</Button>
																</DialogActions>
															</Dialog>
															<Dialog open={openUpdate} onClose={handleClose}>
																<DialogTitle>Update WorkspaceType</DialogTitle>
																<DialogContent>
																	<DialogContentText>
																					Update WorkspaceType:
																	</DialogContentText>
																	<Box component="form" ref={divRef} noValidate sx={{ mt: 1 }}>
																		<TextField
																			margin="normal"
																			fullWidth
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
																		/>
																		<TextField
																			margin="normal"
																			fullWidth
																			id="workspaceType"
																			label="Max Reservation Window"
																			name="maxReservationWindow"
																		/>
																		<TextField
																			margin="normal"
																			fullWidth
																			id="workspaceType"
																			label="Allow Permanent Reservations"
																			name="allowPermanentReservations"
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
											'There are no workspace types...'
										)}
								</Box>
							</Box>
						</main>)
			}

		</div>
	);
};

export default WorkspaceType;
