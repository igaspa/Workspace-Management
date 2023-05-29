import CssBaseline from '@mui/material/CssBaseline';
import { TextField, Typography, Container, Box, Checkbox } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { useCreateWorkspaceTypeMutation } from '../../../api/workspaceTypeApiSlice';
import { errorHandler } from '../../../utils/errors';
import ConfirmButton from '../../../components/Buttons/confirmButton';
import CancelButton from '../../../components/Buttons/cancelButton';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { successToast } from '../../../utils/toastifyNotification';

export default function CreateWorkspaceType () {
	const [createWorkspaceType] = useCreateWorkspaceTypeMutation();
	const [allowPermanentReservation, setAllowPermanentReservation] = useState(false);
	const divRef = useRef();
	const navigate = useNavigate();

	const handleCancel = (event) => {
		navigate('/backoffice/workspace-type');
	};
	const handleSubmit = async (event) => {
		event.preventDefault();
		const data = new FormData(divRef.current);

		await createWorkspaceType(
			{
				id: uuidv4(),
				name: data.get('workspaceType'),
				maxReservationInterval: data.get('maxReservationInterval'),
				maxReservationWindow: `${data.get('maxReservationWindow')} days`,
				allowPermanentReservations: allowPermanentReservation
			})
			.unwrap()
			.then((response) => {
				successToast(response.message);
				navigate('/backoffice/workspace-type');
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
            Create new Workspace Type
					</Typography>
					<Box component="form" ref={divRef} noValidate sx={{ mt: 1 }}>
						<TextField
							margin="normal"
							fullWidth
							id="workspaceType"
							label="WorkspaceType Name"
							name="workspaceType"
							required={true}
						/>
						<TextField
							margin="normal"
							fullWidth
							id="workspaceType"
							label="Max Reservation Interval"
							name="maxReservationInterval"
							required={true}
							placeholder="hh:mm"
						/>
						<TextField
							fullWidth
							margin="normal"
							id="workspaceType"
							label="Max Reservation Window (days)"
							name="maxReservationWindow"
							defaultValue={1}
							type="number"
							required={true}
							inputProps={{ min: 1 }}
						/>
						<Box sx={{ display: 'flex', alignItems: 'center' }}>
							<Checkbox
								id="allowPermanentReservations"
								checked={allowPermanentReservation}
								onChange={(event) => setAllowPermanentReservation(event.target.checked)}
							/>
							<label htmlFor="allowPermanentReservations">Allow Permanent Reservations</label>
						</Box>
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
