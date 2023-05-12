import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useCreateWorkspaceTypeMutation } from '../../../api/workspaceTypeApiSlice';
import { errorHandler } from '../../../utils/errors';

const theme = createTheme();

export default function CreateWorkspaceType () {
	const [createWorkspaceType] = useCreateWorkspaceTypeMutation();
	const handleSubmit = async (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);

		await createWorkspaceType(
			{
				id: uuidv4(),
				name: data.get('workspaceType'),
				maxReservationInterval: data.get('maxReservationInterval'),
				maxReservationWindow: data.get('maxReservationWindow'),
				allowPermanentReservations: data.get('allowPermanentReservations')
			})
			.unwrap()
			.then((response) => {
				event.target.reset();
			})
			.catch((error) => {
				errorHandler(error);
			});
	};

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
            Create new Workspace Type
					</Typography>
					<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
             Submit
						</Button>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
}
