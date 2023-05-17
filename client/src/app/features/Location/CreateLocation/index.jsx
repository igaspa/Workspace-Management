import CssBaseline from '@mui/material/CssBaseline';
import { TextField, Typography, Container, Box } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useCreateLocationMutation } from '../../../api/locationApiSlice';
import { errorHandler } from '../../../utils/errors';
import ConfirmButton from '../../../components/Buttons/confirmButton';
import CancelButton from '../../../components/Buttons/cancelButton';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { successToast } from '../../../utils/toastifyNotification';

const theme = createTheme();

export default function CreateLocation () {
	const [createLocation] = useCreateLocationMutation();
	const divRef = useRef();
	const navigate = useNavigate();

	const handleCancel = (event) => {
		navigate('/backoffice/location');
	};
	const handleConfirm = async (event) => {
		event.preventDefault();
		const data = new FormData(divRef.current);
		console.log(data.get('address'));
		await createLocation(
			{
				id: uuidv4(),
				address: data.get('address'),
				city: data.get('city'),
				country: data.get('country')
			})
			.unwrap()
			.then((response) => {
				successToast(response.message);
				divRef.current.reset();
			})
			.catch((error) => {
				console.log(error);
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
            Create new Location
					</Typography>
					<Box component="form" ref={divRef} noValidate sx={{ mt: 1 }}>
						<TextField
							margin="normal"
							required
							fullWidth
							id="location"
							label="Location Address"
							name="address"
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							id="location"
							label="City"
							name="city"
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							id="location"
							label="Country"
							name="country"
						/>
						<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
							<ConfirmButton text={'Confirm'} onClick={handleConfirm}/>
							<CancelButton text={'Cancel'} onClick={handleCancel}/>
						</div>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
}
