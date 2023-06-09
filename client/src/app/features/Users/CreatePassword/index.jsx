import CssBaseline from '@mui/material/CssBaseline';
import { TextField, Typography, Container, Box } from '@mui/material';
import { errorHandler } from '../../../utils/errors';
import ConfirmButton from '../../../components/Buttons/confirmButton';
import { useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { successToast } from '../../../utils/toastifyNotification';
import { useCreateUserPasswordMutation } from '../../../api/usersApiSlice';

export default function CreatePassword() {
  const [createPassword] = useCreateUserPasswordMutation();
  const divRef = useRef();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleConfirm = async (event) => {
    event.preventDefault();
    const data = new FormData(divRef.current);
    const objectToUpdate = {
      password: data.get('password')
    };
    await createPassword({
      token: searchParams.get('token'),
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
            Create password
          </Typography>
          <Box width={'100%'} component="form" onSubmit={handleConfirm} ref={divRef} sx={{ mt: 1 }}>
            <TextField
              type={'password'}
              required
              margin="normal"
              fullWidth
              id="password"
              label="Password"
              name="password"
            />
            <TextField
              type={'password'}
              required
              margin="normal"
              fullWidth
              id="repeatPassword"
              label="Repeat Password"
              name="repeatPassword"
            />

            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', marginTop: 10 }}>
              <ConfirmButton text={'Submit'} type="submit" />
            </div>
          </Box>
        </Box>
      </Container>
    </>
  );
}
