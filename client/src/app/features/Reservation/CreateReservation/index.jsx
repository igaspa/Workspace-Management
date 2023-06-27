import { useState, useEffect, useRef } from 'react';
import { Typography, Box, Grid, CircularProgress, Container } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { getNext7Days, getHours, createDate } from '../../../utils/helper';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import {
  useCreatePermanentReservationMutation,
  useCreateReservationMutation,
  useGetReservationsFromWorkspaceQuery
} from '../../../api/reservationApiSlice';
import { errorToast, successToast } from '../../../utils/toastifyNotification';
import { errorHandler } from '../../../utils/errors';
import { useDispatch } from 'react-redux';
import ActiveReservationCard from '../../../components/Reservation/workspaceReservations';
import { BasicPagination } from '../../../components/Pagination/pagination';
import { workspacesApiSlice } from '../../../api/workspaceApiSlice';
import { Stack } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { useGetUsersListQuery } from '../../../api/usersApiSlice';
import StandardReservation from '../../../components/Reservation/standardReservation';
import PrivilegeReservation from '../../../components/Reservation/privilegeReservation';

const CreateReservation = ({ workspace, onClose, endTime, startTime, reservationFromDate, reservationUntilDate }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [standardReservationApi] = useCreateReservationMutation();
  const [permanentReservationApi] = useCreatePermanentReservationMutation();

  const role = localStorage.getItem('role');

  const currentDay = createDate(0);

  const [startDate, setStartDate] = useState(reservationFromDate || currentDay);
  const [endDate, setEndDate] = useState(reservationUntilDate || startDate);

  const [startHour, setStartHour] = useState(startTime || '');
  const [endHour, setEndHour] = useState(endTime || '');

  const [startAt, setStartAt] = useState('');
  const [endAt, setEndAt] = useState('');

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [participantEmailSlice, setParticipantEmailSlice] = useState('');

  const [page, setPage] = useState(1);
  const divRef = useRef();

  const startHours = getHours(startDate);
  const endHours = getHours(endDate || startDate);
  const maxReservationWindow = workspace.workspaceType?.maxReservationWindow.days || 7;
  const dates = getNext7Days(maxReservationWindow);

  const [permanentReservation, setPermanentReservation] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  const handleSelectedUser = (event, selectedUser) => {
    setSelectedUser(selectedUser);
  };

  const handleReservationTypeChange = (event) => {
    const type = event.target.value;
    setPermanentReservation(type);
  };

  const handlePageChange = async (event, value) => {
    setPage(value);
  };

  // get selected start date
  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
    if (new Date(event.target.value) > new Date(endDate)) setEndDate(event.target.value);
  };

  // get selected start date
  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
    if (new Date(event.target.value) < new Date(startDate)) setStartDate(event.target.value);
  };

  // get selected start hour
  const handleStartHourChange = (event) => {
    setStartHour(event.target.value);
  };

  // get selected end hour
  const handleEndHourChange = (event) => {
    setEndHour(event.target.value);
  };

  // set startAt value
  useEffect(() => {
    if (startDate && startHour) {
      setStartAt(`${startDate}T${startHour}`);
    }
  }, [startDate, startHour, startAt]);

  // set endAt value
  useEffect(() => {
    if (role.includes('Administrator') || role.includes('Lead')) {
      if (endDate && endHour) setEndAt(`${endDate}T${endHour}`);
    } else if (startDate && endHour) setEndAt(`${startDate}T${endHour}`);
  }, [endDate, endHour, startDate, startHour]);

  const handleParticipantChange = (event, value) => {
    setSelectedUsers(value);
  };

  const handleEmailInputChange = (e) => {
    const email = e.target.value;
    if (e.target.value.length > 2) setParticipantEmailSlice(email.slice(0, 3));
  };

  const postReservation = async (reservationType, data) => {
    await reservationType(data)
      .unwrap()
      .then((response) => {
        successToast(response.message);
        dispatch(workspacesApiSlice.util.invalidateTags(['workspacesList']));
        onClose();
      })
      .catch((error) => {
        errorHandler(error, navigate);
      });
  };

  const createPermanentReservation = async (event) => {
    if (!selectedUser.id) errorToast('You need to select a user!');
    else {
      const objectToPost = {
        id: uuidv4(),
        userId: selectedUser.id,
        workspaceId: workspace.id,
        startAt: new Date(startAt)
      };
      await postReservation(permanentReservationApi, objectToPost);
    }
  };

  const createStandardReservation = async (event) => {
    const participants = selectedUsers.map((user) => {
      return {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      };
    });

    const objectToPost = {
      id: uuidv4(),
      workspaceId: workspace.id,
      startAt: new Date(startAt),
      endAt: new Date(endAt),
      addedParticipants: participants
    };

    await postReservation(standardReservationApi, objectToPost);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (permanentReservation) await createPermanentReservation();
    else await createStandardReservation();
  };

  // eslint-disable-next-line no-unused-vars
  const {
    data: [reservations, pages] = [],
    isError: reservationsFetchError,
    error: reservationErrorObject,
    isLoading: reservationsLoading
  } = useGetReservationsFromWorkspaceQuery({
    from: startDate,
    until: endDate,
    workspaceId: workspace.id,
    ...(page && { page })
  });

  const {
    data: [users, userPages] = [],
    isError: userFetchError,
    error: userErrorObject,
    isLoading: userLoading
  } = useGetUsersListQuery({
    email: participantEmailSlice.length ? participantEmailSlice : '/'
  });

  useEffect(() => {
    if (reservationsFetchError) {
      errorHandler(reservationErrorObject, navigate);
    }
    if (userFetchError) {
      errorHandler(userErrorObject, navigate);
    }
  }, [reservations, users]);

  // Render loading state
  if (reservationsLoading || userLoading) {
    return <CircularProgress />;
  }

  return (
    <Container maxWidth="lg" style={{ padding: 0 }}>
      <CssBaseline />
      <main>
        <Box spacing={2} direction="row" flexWrap="wrap">
          <Typography component="h1" variant="h4" align="center" color="text.primary" gutterBottom paddingTop={2}>
            Reserve a Space <br></br>- {workspace.name} -
          </Typography>

          {/* Container start */}
          <Stack spacing={1} justifyContent="space-between" marginTop={5}>
            <form onSubmit={handleSubmit} style={{ padding: 10 }}>
              {role.includes('Administrator') || role.includes('Lead') ? (
                <PrivilegeReservation
                  permanentReservation={permanentReservation}
                  handleReservationTypeChange={handleReservationTypeChange}
                  handleStartDateChange={handleStartDateChange}
                  handleEndDateChange={handleEndDateChange}
                  handleStartHourChange={handleStartHourChange}
                  handleEndHourChange={handleEndHourChange}
                  startHour={startHour}
                  startHours={startHours}
                  endHour={endHour}
                  endHours={endHours}
                  startDate={startDate}
                  endDate={endDate}
                  dates={dates}
                  users={users}
                  selectedUsers={selectedUsers}
                  selectedUser={selectedUser}
                  handleParticipantChange={handleParticipantChange}
                  handleSelectedUser={handleSelectedUser}
                  handleEmailInputChange={handleEmailInputChange}
                  workspaceType={workspace.workspaceType}
                />
              ) : (
                <StandardReservation
                  handleStartDateChange={handleStartDateChange}
                  handleStartHourChange={handleStartHourChange}
                  handleEndHourChange={handleEndHourChange}
                  startHour={startHour}
                  startHours={startHours}
                  startDate={startDate}
                  dates={dates}
                  endHour={endHour}
                  endHours={endHours}
                  users={users}
                  selectedUsers={selectedUsers}
                  handleParticipantChange={handleParticipantChange}
                  handleEmailInputChange={handleEmailInputChange}
                  workspaceType={workspace.workspaceType}
                />
              )}
            </form>
          </Stack>

          {reservations && reservations.length > 0 && (
            <div style={{ padding: 10 }}>
              <Typography variant="h5" gutterBottom sx={{ padding: 2 }}>
                Active reservations for this workspace
              </Typography>

              <Box spacing={1} direction="row" flexWrap="wrap" margin={0}>
                <Grid
                  ref={divRef}
                  sx={{
                    display: 'grid',
                    rowGap: 1,
                    columnGap: 1,
                    gridTemplateColumns: 'repeat(1, 1fr)',
                    paddingBottom: 2
                  }}
                >
                  {reservations.map((reservation) => (
                    <ActiveReservationCard key={reservation.id} reservation={reservation} />
                  ))}
                </Grid>
              </Box>
            </div>
          )}

          {reservations && reservations.length > 0 && (
            <BasicPagination count={pages} page={page} onChange={handlePageChange} />
          )}
        </Box>
      </main>
    </Container>
  );
};

export default CreateReservation;

CreateReservation.propTypes = {
  workspace: PropTypes.object,
  startTime: PropTypes.string,
  endTime: PropTypes.string,
  reservationFromDate: PropTypes.string,
  reservationUntilDate: PropTypes.string,
  onClose: PropTypes.func
};
