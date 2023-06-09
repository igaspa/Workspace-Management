import CssBaseline from '@mui/material/CssBaseline';
import { TextField, Typography, Container, Box } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

import { errorHandler } from '../../../utils/errors';
import ConfirmButton from '../../../components/Buttons/confirmButton';
import CancelButton from '../../../components/Buttons/cancelButton';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { successToast } from '../../../utils/toastifyNotification';
import { useCreateUserMutation } from '../../../api/usersApiSlice';

export default function CreateUser() {
  const [createUser] = useCreateUserMutation();
  const divRef = useRef();
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/backoffice/users');
  };

  const handleConfirm = async (event) => {
    event.preventDefault();
    const data = new FormData(divRef.current);
    await createUser({
      id: uuidv4(),
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      phoneNumber: data.get('phoneNumber')
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
            Create new User
          </Typography>
          <Box component="form" onSubmit={handleConfirm} ref={divRef} sx={{ mt: 1 }}>
            <TextField required margin="normal" fullWidth id="fname" label="First Name" name="firstName" />
            <TextField required margin="normal" fullWidth id="lname" label="Last Name" name="lastName" />
            <TextField required margin="normal" fullWidth id="email" label="Email" name="email" />
            <TextField margin="normal" fullWidth id="user" label="Phone Number" name="phoneNumber" />
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
              <ConfirmButton text={'Confirm'} type="submit" />
              <CancelButton text={'Cancel'} onClick={handleCancel} />
            </div>
          </Box>
        </Box>
      </Container>
    </>
  );
}
