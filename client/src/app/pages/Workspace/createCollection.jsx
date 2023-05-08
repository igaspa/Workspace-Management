import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CircularProgress, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useGetAreaListQuery } from '../../api/areaApiSlice';
import { useGetWorkspaceTypesListQuery } from '../../api/workspaceTypeApiSlice';
import { errorHandler } from '../../utils/errors';
import { useNavigate } from 'react-router-dom';
import { successToast } from '../../utils/toastifyNotification';
import { useCreateMultipleWorkspacesMutation } from '../../api/workspaceApiSlice';

const theme = createTheme();

export default function WorkspaceCreation () {
	const navigate = useNavigate();

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

	const [createWorkspaces] = useCreateMultipleWorkspacesMutation();

	const handleSubmit = async (event) => {
		event.preventDefault();
		await createWorkspaces(formData)
			.unwrap()
			.then((response) => {
				successToast(response.message);
			})
			.catch((error) => {
				const authorizationError = errorHandler(error);
				if (authorizationError) navigate('/sign-in');
			});
		setFormData({});
	};

	const { data: areas = [], isError: isAreaError, error: areaErrorObject, isLoading: isAreaLoading } = useGetAreaListQuery();

	const { data: workspaceTypes = [], isError: isWorkspaceTypesError, error: workspaceTypeErrorObject, isLoading: isWorkspaceTypesLoading } = useGetWorkspaceTypesListQuery();

	useEffect(() => {
		if (isWorkspaceTypesError) {
			const authorizationError = errorHandler(workspaceTypeErrorObject);
			if (authorizationError) navigate('/sign-in');
		}
		if (isAreaError) {
			const authorizationError = errorHandler(areaErrorObject);
			if (authorizationError) navigate('/sign-in');
		}
		if (workspaceTypes.length && areas.length) {
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
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center'
					}}
				>

					<Typography component="h1" variant="h5">
                        Add multiple workspaces
					</Typography>

					{(areas && workspaceTypes) &&
						(
							<Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
												label="Select Area"
												onChange={handleChange}
												sx={{ textAlign: 'left' }}
												required
												value={formData.typeId || ''}
												name="workspaceTypeId"
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
								</Grid>
								<Button
									type="submit"
									fullWidth
									variant="contained"
									sx={{ mt: 3, mb: 2 }}
								>
									Create
								</Button>
							</Box>
						)
					}
				</Box>
			</Container>
		</ThemeProvider>
	);
}
