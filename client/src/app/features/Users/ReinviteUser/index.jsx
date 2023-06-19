import CssBaseline from '@mui/material/CssBaseline';
import { TextField, Typography, Container, Box } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

import { errorHandler } from '../../../utils/errors';
import ConfirmButton from '../../../components/Buttons/confirmButton';
import CancelButton from '../../../components/Buttons/cancelButton';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { successToast } from '../../../utils/toastifyNotification';
import { useReinviteUserMutation } from '../../../api/usersApiSlice';

export default function ReinviteUser() {
  const [reinviteUser] = useReinviteUserMutation();
  const divRef = useRef();
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/backoffice/users');
  };

  const handleConfirm = async (event) => {
    event.preventDefault();
    const data = new FormData(divRef.current);
    const objectToUpdate = {
      email: data.get('email')
    };
    await reinviteUser({
      body: objectToUpdate
    })
      .unwrap()
      .then((response) => {
        successToast(response.message);
        divRef.current.reset();
        navigate('/backoffice/users');
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
            Reinvite Existing User
          </Typography>
          <Box width={'100%'} component="form" onSubmit={handleConfirm} ref={divRef} sx={{ mt: 1 }}>
            <TextField required margin="normal" fullWidth id="email" label="Email" name="email" />
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
              <ConfirmButton text={'Confirm'} type="submit" />
              <CancelButton text={'Cancel'} onClick={handleCancel} />
            </div>
          </Box>
        </Box>
      </Container>
    </>
  );
}
