import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useCreateEquipmentMutation } from '../../../api/equipmentApiSlice';

const theme = createTheme();

export default function CreateEquipment () {
	const [createEquipment] = useCreateEquipmentMutation();
	const handleSubmit = async (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);

		await createEquipment(
			{
				id: uuidv4(),
				name: data.get('equipment')
			})
			.unwrap()
			.then((response) => {
				event.target.reset();
			})
			.catch((error) => {
				console.log(error);
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
            Create new Equipment
					</Typography>
					<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
						<TextField
							margin="normal"
							required
							fullWidth
							id="equipment"
							label="Equipment Name"
							name="equipment"
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
