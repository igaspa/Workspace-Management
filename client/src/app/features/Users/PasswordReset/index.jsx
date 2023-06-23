import CssBaseline from '@mui/material/CssBaseline';
import { TextField, Typography, Container, Box } from '@mui/material';
import { errorHandler } from '../../../utils/errors';
import ConfirmButton from '../../../components/Buttons/confirmButton';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { successToast } from '../../../utils/toastifyNotification';
import { useResetPasswordMutation } from '../../../api/usersApiSlice';

export default function PasswordReset() {
  const [resetPassword] = useResetPasswordMutation();
  const divRef = useRef();
  const navigate = useNavigate();

  const handleConfirm = async (event) => {
    event.preventDefault();
    const data = new FormData(divRef.current);
    const objectToUpdate = {
      email: data.get('email')
    };
    await resetPassword({
      body: objectToUpdate
    })
      .unwrap()
      .then((response) => {
        successToast(response.message);
        divRef.current.reset();
        navigate('/sign-in');
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
            Reset Password
          </Typography>
          <Box width={'100%'} component="form" onSubmit={handleConfirm} ref={divRef} sx={{ mt: 1 }}>
            <TextField required margin="normal" fullWidth id="email" label="Email" name="email" />
            <ConfirmButton text={'Submit'} type="submit" />
          </Box>
        </Box>
      </Container>
    </>
  );
}
