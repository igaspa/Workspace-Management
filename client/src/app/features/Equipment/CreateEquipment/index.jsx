import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useCreateEquipmentMutation } from '../../../api/equipmentApiSlice';
import { errorHandler } from '../../../utils/errors';
import { successToast } from '../../../utils/toastifyNotification';
import ConfirmButton from '../../../components/Buttons/confirmButton';
import CancelButton from '../../../components/Buttons/cancelButton';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateEquipment () {
	const [createEquipment] = useCreateEquipmentMutation();
	const divRef = useRef();
	const navigate = useNavigate();

	const handleCancel = (event) => {
		navigate('/backoffice/equipment');
	};
	const handleSubmit = async (event) => {
		event.preventDefault();
		const data = new FormData(divRef.current);
		await createEquipment(
			{
				id: uuidv4(),
				name: data.get('equipment')
			})
			.unwrap()
			.then((response) => {
				successToast(response.message);
				divRef.current.reset();
			})
			.catch((error) => {
				errorHandler(error);
			});
	};

	return (
		<>
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
					<Box component="form" ref={divRef} noValidate sx={{ mt: 1 }}>
						<TextField
							margin="normal"
							required
							fullWidth
							id="equipment"
							label="Equipment Name"
							name="equipment"
							onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
						/>
						<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
							<ConfirmButton text={'Confirm'} onClick={handleSubmit}/>
							<CancelButton text={'Cancel'} onClick={handleCancel}/>
						</div>
					</Box>
				</Box>
			</Container>
		</>
	);
}
