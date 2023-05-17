import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, IconButton, InputLabel, MenuItem, Select } from '@mui/material';
import { useGetAreaListQuery } from '../../api/areaApiSlice';
import { useGetWorkspaceTypesListQuery } from '../../api/workspaceTypeApiSlice';
import { errorHandler } from '../../utils/errors';
import { useNavigate } from 'react-router-dom';
import { successToast } from '../../utils/toastifyNotification';
import { useCreateMultipleWorkspacesMutation, useCreateWorkspaceMutation } from '../../api/workspaceApiSlice';
import { v4 as uuidv4 } from 'uuid';
import ArrowBack from '@mui/icons-material/ArrowBack';

const theme = createTheme();

export default function WorkspaceCreation () {
	const navigate = useNavigate();

	const [createOneOpen, setCreateOneWorkspaceOpen] = useState(false);
	const [createMultipleOpen, setCreateMultipleOpen] = useState(false);

	const [multipleWorkspaces, setMultipleWorkspaces] = useState(false);
	const [numOfWorkspaces, setNumOfWorkspaces] = useState('one');

	const [createWorkspace] = useCreateWorkspaceMutation();
	const [createMultipleWorkspaces] = useCreateMultipleWorkspacesMutation();

	const handleCreateOneOpen = (e) => {
		e.preventDefault();
		setCreateOneWorkspaceOpen(true);
	};

	const handleCreateOneClose = () => {
		setCreateOneWorkspaceOpen(false);
	};

	const handleCreateMultipleOpen = (e) => {
		e.preventDefault();
		setCreateMultipleOpen(true);
	};

	const handleCreateMultipleClose = () => {
		setCreateMultipleOpen(false);
	};

	const [formData, setFormData] = useState(
		{ areaId: '', typeId: '' }
	);

	const handleChange = (e) => {
		const value = e.target.value;
		const name = e.target.name;
		setFormData((prevState) => ({
			...prevState,
			[name]: value
		}));
	};

	const handleWorksapceNumChange = (e) => {
		const value = e.target.value;
		if (value === 'one') {
			delete formData.prefix;
			delete formData.start;
			delete formData.end;
			setMultipleWorkspaces(false);
		} else {
			delete formData.name;
			setMultipleWorkspaces(true);
		}
		setNumOfWorkspaces(value);
	};

	const handleCreateClick = async (event, reservation) => {
		event.preventDefault();
		const uuid = uuidv4();
		const apiCall = multipleWorkspaces ? createMultipleWorkspaces : createWorkspace;
		if (!multipleWorkspaces) formData.id = uuid;
		await apiCall(formData)
			.unwrap()
			.then((response) => {
				successToast(response.message);
			})
			.catch((error) => {
				const authorizationError = errorHandler(error);
				if (authorizationError) navigate('/sign-in');
			});
		setFormData({});
		handleCreateOneClose();
		handleCreateMultipleClose();
	};

	const navigateBack = () => {
		navigate('/backoffice/workspaces');
	};

	const { data: areas = [], isError: isAreaError, error: areaErrorObject, isLoading: isAreaLoading } = useGetAreaListQuery();

	const { data: [workspaceTypes] = [], isError: isWorkspaceTypesError, error: workspaceTypeErrorObject, isLoading: isWorkspaceTypesLoading } = useGetWorkspaceTypesListQuery();

	useEffect(() => {
		if (isWorkspaceTypesError) {
			const authorizationError = errorHandler(workspaceTypeErrorObject);
			if (authorizationError) navigate('/sign-in');
		}
		if (isAreaError) {
			const authorizationError = errorHandler(areaErrorObject);
			if (authorizationError) navigate('/sign-in');
		}
		if (workspaceTypes?.length && areas?.length) {
			setFormData((prevState) => ({
				...prevState,
				typeId: workspaceTypes[0].id,
				areaId: areas[0].id
			}));
		}
	}, [workspaceTypes, areas]);

	if (isAreaLoading || isWorkspaceTypesLoading) {
		return <CircularProgress />;
	}

	return (
		<ThemeProvider theme={theme}>
			<Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
				<IconButton
					sx={{
						mt: 3,
						mb: 2
					}}
					onClick={navigateBack}
				>
					<ArrowBack />
				</IconButton>
			</Box>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 2,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center'
					}}
				>

					<Typography component="h1" variant="h5">
                        Add workspace/s
					</Typography>

					{(areas && workspaceTypes) &&
						(
							<Box component="form" onSubmit={multipleWorkspaces ? handleCreateMultipleOpen : handleCreateOneOpen} sx={{ mt: 3 }}>
								<Grid container spacing={2}>
									<Grid item xs={12} >
										<FormControl fullWidth>
											<InputLabel id="select-area">Select Area</InputLabel>
											<Select
												labelId="select-area"
												label="Select Area"
												onChange={handleChange}
												sx={{ textAlign: 'left' }}
												autoFocus
												required
												value={formData.areaId || ''}
												name="areaId"
											>
												{areas.map((area) => (
													<MenuItem key={area.id} value={area.id}>
														{area.name}
													</MenuItem>
												))}
											</Select>
										</FormControl>
										<br />
									</Grid>
									<Grid item xs={12}>
										<FormControl fullWidth>
											<InputLabel id="select-workspace-type">Workspace Type</InputLabel>
											<Select
												labelId="select-workspace-type"
												label="Select Workspace Type"
												onChange={handleChange}
												sx={{ textAlign: 'left' }}
												required
												value={formData.typeId || ''}
												name="typeId"
											>
												{workspaceTypes.map((workspaceType) => (
													<MenuItem key={workspaceType.id} value={workspaceType.id}>
														{workspaceType.name}
													</MenuItem>
												))}
											</Select>
										</FormControl>
									</Grid>

									<Grid item xs={12}>
										<FormControl fullWidth>
											<InputLabel id="select-NO-workspaces">Number of workspaces</InputLabel>
											<Select
												labelId="select-NO-workspaces"
												label="Select NO of workspaces"
												onChange={handleWorksapceNumChange}
												sx={{ textAlign: 'left' }}
												required
												value={numOfWorkspaces}
												name="numOfWorkspaces"
											>
												<MenuItem key='one' value='one'>
													One
												</MenuItem>
												<MenuItem key='multiple' value='multiple'>
													Multiple
												</MenuItem>

											</Select>
										</FormControl>
									</Grid>

									{ multipleWorkspaces
										? (

											<>
												<Grid item xs={12}>
													<TextField
														autoComplete="Desk"
														name="prefix"
														required
														fullWidth
														id="prefix"
														label="Prefix"
														onChange={handleChange}
														value={formData.prefix || ''}
													/>
												</Grid>

												<Grid item xs={6}>
													<TextField
														name="start"
														required
														id="start"
														label="Start"
														type="number"
														inputProps={{ min: 1 }}
														onChange={handleChange}
														value={formData.start || ''}
													/>
												</Grid>

												<Grid item xs={6}>
													<TextField
														name="end"
														required
														id="prefix"
														label="End"
														type="number"
														inputProps={{ min: 1 }}
														onChange={handleChange}
														value={formData.end || ''}
													/>
												</Grid>
											</>

										)
										: (
											<>
												<Grid item xs={12}>
													<TextField
														name="name"
														required
														fullWidth
														id="name"
														label="Name"
														onChange={handleChange}
														value={formData.name || ''}
													/>
												</Grid>
											</>
										)

									}

								</Grid>
								<Button
									type='submit'
									fullWidth
									variant="contained"
									sx={{ mt: 3, mb: 2 }}
								>
									Create
								</Button>

								<Dialog open={createOneOpen} onClose={handleCreateOneClose}>
									<DialogTitle>Confirmation</DialogTitle>
									<DialogContent>
										<DialogContentText>
                                            Click &quot;Confirm&quot; to create workspace with this name: <br></br><br></br>
											Name: <strong>{formData.name}</strong>
										</DialogContentText>
									</DialogContent>
									<DialogActions>
										<Button onClick={handleCreateClick} autoFocus>Confirm</Button>
										<Button onClick={handleCreateOneClose}>Cancel</Button>
									</DialogActions>
								</Dialog>

								<Dialog open={createMultipleOpen} onClose={handleCreateMultipleClose}>
									<DialogTitle>Create workspaces</DialogTitle>
									<DialogContent>
										<DialogContentText>
											Are you sure you want to create {formData.end - formData.start + 1} workspace/s ? <br></br><br></br>
											<strong>&quot;{formData.prefix} - {formData.start}&quot; .... &quot;{formData.prefix} - {formData.end}&quot;</strong>
										</DialogContentText>
									</DialogContent>
									<DialogActions>
										<Button onClick={handleCreateClick} autoFocus>Create</Button>
										<Button onClick={handleCreateMultipleClose}>Cancel</Button>
									</DialogActions>
								</Dialog>
							</Box>
						)
					}

				</Box>
			</Container>
		</ThemeProvider>
	);
}
