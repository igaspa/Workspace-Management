import {
  Box,
  Checkbox,
  Chip,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  TextField,
  Select
} from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useGetRoleListQuery } from '../../api/roleApiSlice';
import CancelButton from '../Buttons/cancelButton';
import ConfirmButton from '../Buttons/confirmButton';

const UserForm = ({ user, onSave, onCancel }) => {
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    phoneNumber: user.phoneNumber,
    email: user.email
  });

  const [currentRoles, setSelectedRoles] = useState(user.roles.map((role) => role.id));

  const calculateAddedAndRemovedRoles = (data) => {
    const oldRoles = user.roles.map((role) => role.id);

    const addedRoles = currentRoles.filter((item) => !oldRoles.some((oldItem) => oldItem === item));

    const removedRoles = oldRoles.filter((oldItem) => !currentRoles.some((item) => item === oldItem));

    if (addedRoles.length) data.addedRoles = addedRoles;
    if (removedRoles.length) data.removedRoles = removedRoles;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const changedData = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== user[key]) {
        changedData[key] = value;
      }
    });
    calculateAddedAndRemovedRoles(changedData);
    onSave(changedData);
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
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          required
          fullWidth
          sx={{ marginTop: 2 }}
          label="First Name"
          name="firstName"
          value={formData.firstName || ''}
          onChange={handleChange}
        />

        <TextField
          required
          fullWidth
          sx={{ marginTop: 2 }}
          label="Last Name"
          name="lastName"
          value={formData.lastName || ''}
          onChange={handleChange}
        />

        <TextField
          required
          fullWidth
          sx={{ marginTop: 2 }}
          label="Email"
          name="email"
          value={formData.email || ''}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          sx={{ marginTop: 2 }}
          label="Phone Number"
          name="phoneNumber"
          value={formData.phoneNumber || ''}
          onChange={handleChange}
        />

        <FormControl fullWidth sx={{ marginTop: 2, marginBottom: 2 }}>
          <InputLabel required id="roles-label">
            Roles
          </InputLabel>
          <Select
            required
            labelId="roles-label"
            id="roles"
            multiple
            value={currentRoles}
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
                <Checkbox checked={currentRoles.includes(role.id)} />
                {role.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20 }}>
          <ConfirmButton type={'submit'} text={'Save'} />
          <CancelButton onClick={onCancel} text={'Cancel'} />
        </div>
      </Box>
    </>
  );
};

UserForm.propTypes = {
  user: PropTypes.object,
  onSave: PropTypes.func,
  onCancel: PropTypes.func
};

export default UserForm;
