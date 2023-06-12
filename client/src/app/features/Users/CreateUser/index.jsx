import CssBaseline from '@mui/material/CssBaseline';
import {
  TextField,
  Typography,
  Container,
  Box,
  CircularProgress,
  InputLabel,
  OutlinedInput,
  Chip,
  FormControl,
  Select,
  MenuItem,
  Checkbox
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { errorHandler } from '../../../utils/errors';
import ConfirmButton from '../../../components/Buttons/confirmButton';
import CancelButton from '../../../components/Buttons/cancelButton';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { successToast } from '../../../utils/toastifyNotification';
import { useCreateUserMutation } from '../../../api/usersApiSlice';
import { useGetRoleListQuery } from '../../../api/roleApiSlice';

export default function CreateUser() {
  const [createUser] = useCreateUserMutation();
  const divRef = useRef();
  const navigate = useNavigate();
  const [selectedRoles, setSelectedRoles] = useState([]);

  const handleCancel = () => {
    navigate('/backoffice/users');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(divRef.current);
    await createUser({
      id: uuidv4(),
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      ...(data.get('phoneNumber') && { phoneNumber: data.get('phoneNumber') }),
      addedRoles: selectedRoles
    })
      .unwrap()
      .then((response) => {
        successToast(response.message);
        divRef.current.reset();
        setSelectedRoles([]);
      })
      .catch((error) => {
        errorHandler(error);
      });
  };

  const {
    data: [roles, _rolesPages] = [],
    isError: roleFetchError,
    error: roleErrorObject,
    isLoading: rolesLoading
  } = useGetRoleListQuery({});

  const handleDeleteRole = (roleId) => {
    setSelectedRoles((prevRoles) => prevRoles.filter((prevRoleId) => prevRoleId !== roleId));
  };

  if (rolesLoading) {
    return <CircularProgress />;
  }

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
          <Box component="form" onSubmit={handleSubmit} ref={divRef} sx={{ mt: 1 }}>
            <TextField required margin="normal" fullWidth id="fname" label="First Name" name="firstName" />
            <TextField required margin="normal" fullWidth id="lname" label="Last Name" name="lastName" />
            <TextField required margin="normal" fullWidth id="email" label="Email" name="email" />
            <TextField margin="normal" fullWidth id="user" label="Phone Number" name="phoneNumber" />

            <FormControl fullWidth sx={{ marginTop: 2, marginBottom: 2 }}>
              <InputLabel required id="roles-label">
                Roles
              </InputLabel>
              <Select
                required
                labelId="roles-label"
                id="roles"
                multiple
                value={selectedRoles}
                onChange={(event) => setSelectedRoles(event.target.value)}
                input={<OutlinedInput id="select-roles" label="Roles" />}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: '25vh'
                    }
                  }
                }}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((roleId) => {
                      const role = roles.find((role) => role.id === roleId);
                      return (
                        <Chip
                          key={role.id}
                          label={role.name}
                          onDelete={(event) => handleDeleteRole(role.id)}
                          onMouseDown={(event) => event.stopPropagation()}
                        />
                      );
                    })}
                  </Box>
                )}
              >
                {roles.map((role) => (
                  <MenuItem key={role.id} value={role.id}>
                    <Checkbox checked={selectedRoles.includes(role.id)} />
                    {role.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

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
