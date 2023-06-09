import { Box, Button, FormControl, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const changedData = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== user[key]) {
        changedData[key] = value;
      }
    });
    onSave(changedData);
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          fullWidth
          sx={{ marginTop: 2 }}
          label="First Name"
          required
          name="firstName"
          value={formData.firstName || ''}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          sx={{ marginTop: 2 }}
          label="Last Name"
          required
          name="lastName"
          value={formData.lastName || ''}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          sx={{ marginTop: 2 }}
          label="Email"
          required
          name="email"
          value={formData.email || ''}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          sx={{ marginTop: 2 }}
          label="Phone Number"
          required
          name="phoneNumber"
          value={formData.phoneNumber || ''}
          onChange={handleChange}
        />

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
