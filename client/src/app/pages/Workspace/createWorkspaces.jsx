import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select
} from '@mui/material';
import { useGetAreaListQuery } from '../../api/areaApiSlice';
import { useGetWorkspaceTypesListQuery } from '../../api/workspaceTypeApiSlice';
import { errorHandler } from '../../utils/errors';
import { useNavigate } from 'react-router-dom';
import { successToast } from '../../utils/toastifyNotification';
import { useCreateMultipleWorkspacesMutation, useCreateWorkspaceMutation } from '../../api/workspaceApiSlice';
import { v4 as uuidv4 } from 'uuid';
import { useGetEquipmentsListQuery } from '../../api/equipmentApiSlice';
import ConfirmButton from '../../components/Buttons/confirmButton';
import CancelButton from '../../components/Buttons/cancelButton';

export default function WorkspaceCreation() {
  const navigate = useNavigate();

  const [createOneOpen, setCreateOneWorkspaceOpen] = useState(false);
  const [createMultipleOpen, setCreateMultipleOpen] = useState(false);

  const [multipleWorkspaces, setMultipleWorkspaces] = useState(false);
  const [numOfWorkspaces, setNumOfWorkspaces] = useState('one');

  const [allowMultiple, setAllowMultiple] = useState(false);

  const [createWorkspace] = useCreateWorkspaceMutation();
  const [createMultipleWorkspaces] = useCreateMultipleWorkspacesMutation();

  const handleCreateOneOpen = (e) => {
    e.preventDefault();
    setCreateOneWorkspaceOpen(true);
  };

  const handleCreateOneClose = () => {
    setCreateOneWorkspaceOpen(false);
  };

  const handleCreateMultipleOpen = (e) => {
    e.preventDefault();
    setCreateMultipleOpen(true);
  };

  const handleCreateMultipleClose = () => {
    setCreateMultipleOpen(false);
  };

  const [formData, setFormData] = useState({ areaId: '', typeId: '' });

  const [currentEquipment, setEquipment] = useState([]);

  const handleEquipmentChange = (event) => {
    const {
      target: { value }
    } = event;
    const newEl = value.slice(-1)[0];

    const newEquipmentQuantity = [...currentEquipment];

    // find if any element id is same as the newly added
    const found = newEquipmentQuantity.find((el) => el.id === newEl);

    // if there are no elements with newly adding id, add that element to the list, otherwise increase quantity by 1
    if (!found) {
      newEquipmentQuantity.push({ id: newEl, quantity: 1 });
    } else {
      newEquipmentQuantity.map((el) => {
        if (el.id === newEl) {
          el.quantity += 1;
        }
        return el;
      });
    }

    setEquipment(newEquipmentQuantity);
  };

  const handleEquipmentRemove = (id) => {
    const newEquipmentQuantity = [...currentEquipment];
    const index = newEquipmentQuantity.findIndex((el) => el.id === id);
    if (index !== -1) {
      newEquipmentQuantity[index].quantity -= 1;
      if (newEquipmentQuantity[index].quantity === 0) {
        newEquipmentQuantity.splice(index, 1);
      }
    }
    setEquipment(newEquipmentQuantity);
  };

  const handleTypeChange = (name, value) => {
    const selectedType = workspaceTypes.find((el) => el.id === value);
    if (!selectedType.allowMultipleParticipants) delete formData.participantLimit;
    else formData.participantLimit = null;
    setAllowMultiple(selectedType.allowMultipleParticipants);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === 'typeId') handleTypeChange(name, value);

    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleWorksapceNumChange = (e) => {
    const value = e.target.value;
    if (value === 'one') {
      delete formData.prefix;
      delete formData.start;
      delete formData.end;
      setMultipleWorkspaces(false);
    } else {
      delete formData.name;
      setMultipleWorkspaces(true);
    }
    setNumOfWorkspaces(value);
  };

  const handleCreateClick = async (event, reservation) => {
    event.preventDefault();
    const uuid = uuidv4();
    const apiCall = multipleWorkspaces ? createMultipleWorkspaces : createWorkspace;
    if (!multipleWorkspaces) formData.id = uuid;
    if (currentEquipment.length) formData.addedAccessories = currentEquipment;
    await apiCall(formData)
      .unwrap()
      .then((response) => {
        successToast(response.message);
        navigate('/backoffice/workspaces');
      })
      .catch((error) => {
        const authorizationError = errorHandler(error);
        if (authorizationError) navigate('/sign-in');
      });
    setFormData({});
    setEquipment([]);
    handleCreateOneClose();
    handleCreateMultipleClose();
  };

  const navigateBack = () => {
    navigate('/backoffice/workspaces');
  };

  const {
    data: [areas] = [],
    isError: isAreaError,
    error: areaErrorObject,
    isLoading: isAreaLoading
  } = useGetAreaListQuery();

  const {
    data: [workspaceTypes] = [],
    isError: isWorkspaceTypesError,
    error: workspaceTypeErrorObject,
    isLoading: isWorkspaceTypesLoading
  } = useGetWorkspaceTypesListQuery();

  const {
    data: [equipment] = [],
    isError: isEquipmentError,
    error: equipmentErrorObject,
    isLoading: isEquipmentsLoading
  } = useGetEquipmentsListQuery({});

  useEffect(() => {
    if (isWorkspaceTypesError) {
      const authorizationError = errorHandler(workspaceTypeErrorObject);
      if (authorizationError) navigate('/sign-in');
    }
    if (isAreaError) {
      const authorizationError = errorHandler(areaErrorObject);
      if (authorizationError) navigate('/sign-in');
    }
    if (isEquipmentError) {
      const authorizationError = errorHandler(equipmentErrorObject);
      if (authorizationError) navigate('/sign-in');
    }
    if (workspaceTypes?.length && areas?.length) {
      setFormData((prevState) => ({
        ...prevState,
        typeId: workspaceTypes[0].id,
        areaId: areas[0].id
      }));
    }
  }, [workspaceTypes, areas, equipment]);

  if (isAreaLoading || isWorkspaceTypesLoading || isEquipmentsLoading) {
    return <CircularProgress />;
  }

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Typography component="h1" variant="h5">
            Add workspace/s
          </Typography>

          {areas && workspaceTypes && (
            <Box
              component="form"
              onSubmit={multipleWorkspaces ? handleCreateMultipleOpen : handleCreateOneOpen}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="select-area">Select Area</InputLabel>
                    <Select
                      labelId="select-area"
                      label="Select Area"
                      onChange={handleChange}
                      sx={{ textAlign: 'left' }}
                      autoFocus
                      required
                      value={formData.areaId || ''}
                      name="areaId"
                    >
                      {areas.map((area) => (
                        <MenuItem key={area.id} value={area.id}>
                          {area.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <br />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="select-workspace-type">Workspace Type</InputLabel>
                    <Select
                      labelId="select-workspace-type"
                      label="Select Workspace Type"
                      onChange={handleChange}
                      sx={{ textAlign: 'left' }}
                      required
                      value={formData.typeId || ''}
                      name="typeId"
                    >
                      {workspaceTypes.map((workspaceType) => (
                        <MenuItem key={workspaceType.id} value={workspaceType.id}>
                          {workspaceType.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                {allowMultiple && (
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <TextField
                        fullWidth
                        id="participantLimit"
                        name="participantLimit"
                        onChange={handleChange}
                        margin="normal"
                        label="Participant limit (leave empty for unlimited)"
                        defaultValue={null}
                        type="number"
                        inputProps={{ min: 1 }}
                      />
                    </FormControl>
                  </Grid>
                )}

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="multiple-chip-label">Accessories</InputLabel>
                    <Select
                      labelId="multiple-chip-label"
                      id="multiple-chip"
                      multiple
                      value={currentEquipment}
                      onChange={handleEquipmentChange}
                      input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                          {selected.map((currEq) => {
                            const eq = equipment.find((eq) => eq.id === currEq.id);
                            return (
                              <Chip
                                key={eq.id}
                                label={`${eq.name} - ${currEq.quantity}`}
                                onDelete={(event) => handleEquipmentRemove(eq.id)}
                                onMouseDown={(event) => event.stopPropagation()}
                              />
                            );
                          })}
                        </Box>
                      )}
                    >
                      {equipment.map((eq) => (
                        <MenuItem key={eq.id} value={eq.id}>
                          {eq.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="select-NO-workspaces">Number of workspaces</InputLabel>
                    <Select
                      labelId="select-NO-workspaces"
                      label="Select NO of workspaces"
                      onChange={handleWorksapceNumChange}
                      sx={{ textAlign: 'left' }}
                      required
                      value={numOfWorkspaces}
                      name="numOfWorkspaces"
                    >
                      <MenuItem key="one" value="one">
                        Single
                      </MenuItem>
                      <MenuItem key="multiple" value="multiple">
                        Multiple
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {multipleWorkspaces ? (
                  <>
                    <Grid item xs={12}>
                      <TextField
                        autoComplete="Desk"
                        name="prefix"
                        required
                        fullWidth
                        id="prefix"
                        label="Prefix"
                        onChange={handleChange}
                        value={formData.prefix || ''}
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <TextField
                        name="start"
                        required
                        id="start"
                        label="Start"
                        type="number"
                        inputProps={{ min: 1 }}
                        onChange={handleChange}
                        value={formData.start || ''}
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <TextField
                        name="end"
                        required
                        id="prefix"
                        label="End"
                        type="number"
                        inputProps={{ min: 1 }}
                        onChange={handleChange}
                        value={formData.end || ''}
                      />
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid item xs={12}>
                      <TextField
                        name="name"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        onChange={handleChange}
                        value={formData.name || ''}
                      />
                    </Grid>
                  </>
                )}
              </Grid>

              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                <ConfirmButton type={'submit'} text={'Confirm'} />
                <CancelButton text={'Cancel'} onClick={navigateBack} />
              </div>

              <Dialog open={createOneOpen} onClose={handleCreateOneClose}>
                <DialogTitle>Confirmation</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Click &quot;Confirm&quot; to create workspace with this name: <br></br>
                    <br></br>
                    Name: <strong>{formData.name}</strong>
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCreateClick} autoFocus>
                    Confirm
                  </Button>
                  <Button onClick={handleCreateOneClose}>Cancel</Button>
                </DialogActions>
              </Dialog>

              <Dialog open={createMultipleOpen} onClose={handleCreateMultipleClose}>
                <DialogTitle>Create workspaces</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Are you sure you want to create {formData.end - formData.start + 1} workspace/s ? <br></br>
                    <br></br>
                    <strong>
                      &quot;{formData.prefix} - {formData.start}&quot; .... &quot;{formData.prefix} - {formData.end}
                      &quot;
                    </strong>
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCreateClick} autoFocus>
                    Create
                  </Button>
                  <Button onClick={handleCreateMultipleClose}>Cancel</Button>
                </DialogActions>
              </Dialog>
            </Box>
          )}
        </Box>
      </Container>
    </>
  );
}
