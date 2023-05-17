import { useState } from 'react';
import { CircularProgress, Typography, Box, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, useMediaQuery } from '@mui/material';
import { successToast } from '../../utils/toastifyNotification';
import { BasicPagination } from '../../components/Pagination/pagination';
import { useDeleteWorkspaceMutation, useGetWorkspacesListQuery, useUpdateWorkspaceMutation } from '../../api/workspaceApiSlice';
import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import { errorHandler } from '../../utils/errors';
import WorkspaceForm from '../../components/Workspace/updateWorkspaceForm';
import { useTheme } from '@mui/material/styles';

const Workspaces = () => {
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

	const navigate = useNavigate();
	const [deleteWorkspace] = useDeleteWorkspaceMutation();
	const [open, setOpen] = useState(false);
	const [openForceDelete, setOpenForceDelete] = useState(false);
	const [selectedId, setSelectedId] = useState();
	const [page, setPage] = useState(1);
	const [selectedWorkspace, setSelectedWorkspace] = useState(null);
	const [showUpdateForm, setShowUpdateForm] = useState(false);
	const [updateWorkspace] = useUpdateWorkspaceMutation();

	const handleCreateWorkspaceButton = () => {
		navigate('/backoffice/create-workspace');
	};

	const handleDeleteButton = (workspaceId) => {
		setSelectedId(workspaceId);
		setOpen(true);
	};

	const handleUpdateButton = (workspace) => {
		setSelectedWorkspace(workspace);
		setSelectedId(workspace.id);
		setShowUpdateForm(true);
	};

	const handleUpdateWorkspace = async (formObject) => {
		if (!Object.keys(formObject).length) {
			successToast('No changes made!');
			setShowUpdateForm(false);
			setSelectedId('');
		} else {
			await updateWorkspace({ id: selectedId, body: formObject })
				.unwrap()
				.then((response) => {
					successToast(response.message);
					setShowUpdateForm(false);
					setSelectedId('');
				})
				.catch((error) => {
					const authorizationError = errorHandler(error);
					if (authorizationError) navigate('/sign-in');
				});
		}
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleOpenForceDelete = () => {
		setOpenForceDelete(true);
	};

	const handleCloseForceDelete = () => {
		setOpenForceDelete(false);
	};

	const handlePageChange = async (event, value) => {
		setPage(value);
	};

	const { data: [workspaces, workspacePages] = [], isError: isWorkspacesError, isLoading: isWorkspacesLoading } = useGetWorkspacesListQuery({
		...(page && { page }),
		include: ['workspaceType', 'equipment']
	});

	const handleDeleteClick = async (event) => {
		event.preventDefault();
		await deleteWorkspace({ id: selectedId })
			.unwrap()
			.then((response) => {
				handleClose();
				successToast(response.message);
			})
			.catch((error) => {
				if (error.status === 400) {
					handleClose();
					handleOpenForceDelete();
				} else (errorHandler(error));
			});
	};

	const handleForceDeleteClick = async (event) => {
		event.preventDefault();
		await deleteWorkspace({ id: selectedId, forceDelete: true })
			.unwrap()
			.then((response) => {
				handleCloseForceDelete();
				successToast(response.message);
			})
			.catch((error) => {
				handleCloseForceDelete();
				errorHandler(error);
			});
	};

	return (
		<div>
			{isWorkspacesLoading
				? (
					<CircularProgress />
				)
				: isWorkspacesError
					? (
						<Typography color="error">Failed to load reservations.</Typography>
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
								<Box sx={{ width: '100%', display: 'flex', flex: 1 }}>
									<Button
										variant="contained"
										onClick={handleCreateWorkspaceButton}
										sx={{ marginBottom: 2, textAlign: 'left' }}
									>
										Create Workspaces
									</Button>

								</Box>

								<Box spacing={1} direction="row" flexWrap="wrap" margin={0}>
									{workspaces.length
										? (
											<>
												<TableContainer component={Paper}>
													<Table>
														<TableHead>
															<TableRow>
																<TableCell>Name</TableCell>
																<TableCell>Type</TableCell>
																<TableCell>Area</TableCell>
																<TableCell>Permanently Reserved</TableCell>
																<TableCell>Equipment</TableCell>
																<TableCell align='center'>Actions</TableCell>
															</TableRow>
														</TableHead>
														<TableBody>
															{workspaces.map((workspace) => (
																<TableRow key={workspace.id}>
																	<TableCell>{workspace.name}</TableCell>
																	<TableCell>{workspace.workspaceType.name}</TableCell>
																	<TableCell>{workspace.area.name}</TableCell>
																	<TableCell>
																		{workspace.permanentlyReserved ? 'true' : 'false'}
																	</TableCell>
																	<TableCell>
																		{workspace.equipment.length
																			? (
																				workspace.equipment.map((eq) => (
																					<div key={eq.id}>
																						{eq.name} - Qty: {eq.workspaceEquipment.quantity}
																					</div>
																				))
																			)
																			: (
																				'/'
																			)}
																	</TableCell>

																	<TableCell align='center'>
																		<Button
																			variant="contained"
																			size="small"
																			color="primary"
																			sx={{ marginLeft: 2, fontSize: 11, margin: 1 }}
																			onClick={() => {
																				handleUpdateButton(workspace);
																			}}
																		>
																			<strong>Update</strong>
																		</Button>
																		<Button
																			variant="contained"
																			size="small"
																			cursor="pointer"
																			onClick={() => handleDeleteButton(workspace.id)}
																			sx={{
																				marginLeft: 2,
																				background: '#ba000d',
																				fontSize: 11,
																				':hover': {
																					background: '#E0115F'
																				},
																				margin: 1
																			}}
																		>
																			<strong>Delete</strong>
																		</Button>

																	</TableCell>

																</TableRow>

															))}

															<Dialog open={open} onClose={handleClose}>
																<DialogTitle>Delete Workspace</DialogTitle>
																<DialogContent>
																	<DialogContentText>
																			Are you sure you want to delete this workspace?
																	</DialogContentText>
																</DialogContent>
																<DialogActions>
																	<Button onClick={handleDeleteClick} autoFocus>Delete</Button>
																	<Button onClick={handleClose}>Cancel</Button>
																</DialogActions>
															</Dialog>

															<Dialog open={openForceDelete} onClose={handleCloseForceDelete}>
																<DialogTitle>Force Delete Workspace</DialogTitle>
																<DialogContent>
																	<DialogContentText>
																			There are active reservations for this workspace, if you wish to proceed click &quot;FORCE DELETE&quot;.
																	</DialogContentText>
																</DialogContent>
																<DialogActions>
																	<Button onClick={handleForceDeleteClick} autoFocus>FORCE DELETE</Button>
																	<Button onClick={handleCloseForceDelete}>Cancel</Button>
																</DialogActions>
															</Dialog>

														</TableBody>
													</Table>
												</TableContainer>

												<BasicPagination count={workspacePages} page={page} onChange={handlePageChange} />

												{showUpdateForm && (
													<Dialog open={showUpdateForm} fullScreen={fullScreen} onClose={() => setShowUpdateForm(false)}>
														<DialogTitle>Update Workspace</DialogTitle>
														<DialogContent>
															<WorkspaceForm
																workspace={selectedWorkspace}
																onSave={handleUpdateWorkspace}
																onCancel={() => setShowUpdateForm(false)}
															/>
														</DialogContent>
													</Dialog>
												)}

											</>
										)
										: (
											'There are no workspaces...'
										)}
								</Box>
							</Box>
						</main>)
			}

		</div>
	);
};

export default Workspaces;
