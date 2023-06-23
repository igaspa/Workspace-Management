import CssBaseline from '@mui/material/CssBaseline';
import { TextField, Box, MenuItem, Select, InputLabel, FormControl, CircularProgress } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useCreateAreaMutation } from '../../../api/areaApiSlice';
import { errorHandler } from '../../../utils/errors';
import { successToast } from '../../../utils/toastifyNotification';
import ConfirmButton from '../../../components/Buttons/confirmButton';
import CancelButton from '../../../components/Buttons/cancelButton';
import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetLocationListQuery } from '../../../api/locationApiSlice';

export default function CreateArea() {
  const [createArea] = useCreateAreaMutation();
  const divRef = useRef();
  const navigate = useNavigate();
  const [locationId, setLocationId] = useState('');

  const handleCancel = (event) => {
    navigate('/backoffice/area');
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(divRef.current);
    await createArea({
      id: uuidv4(),
      name: data.get('name'),
      floor: data.get('floor'),
      image: data.get('image'),
      locationId
    })
      .unwrap()
      .then((response) => {
        successToast(response.message);
        navigate('/backoffice/area');
      })
      .catch((error) => {
        errorHandler(error, navigate);
      });
  };

  const handleLocationChange = (event) => {
    setLocationId(event.target.value);
  };

  const {
    data: [locations] = [],
    isError: isLocationsError,
    error: locationsErrorObject,
    isLoading: isLocationsLoading
  } = useGetLocationListQuery({});

  useEffect(() => {
    if (isLocationsError) {
      errorHandler(locationsErrorObject, navigate);
    }
  }, [locations]);
  if (isLocationsLoading) {
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
            Create new Area
          </Typography>
          <Box component="form" ref={divRef} noValidate sx={{ mt: 1 }}>
            <Box>
              <FormControl fullWidth>
                <InputLabel id="location">Select Location</InputLabel>
                <Select
                  labelId="select-location"
                  label="Select Location"
                  sx={{ textAlign: 'left' }}
                  onChange={handleLocationChange}
                  name="locationId"
                  value={locationId || ''}
                >
                  {locations.map((location) => (
                    <MenuItem key={location.id} value={location.id || ''}>
                      {location.address}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <TextField margin="normal" fullWidth id="area" label="Area Name" name="name" required />
            <TextField margin="normal" fullWidth id="area" label="Area Floor" name="floor" required />
            <TextField
              margin="normal"
              fullWidth
              id="area"
              label="Area Image"
              name="image"
              required
              placeholder="Image Link"
            />
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
              <ConfirmButton text={'Confirm'} onClick={handleSubmit} />
              <CancelButton text={'Cancel'} onClick={handleCancel} />
            </div>
          </Box>
        </Box>
      </Container>
    </>
  );
}
