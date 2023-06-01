import { useParams, useNavigate } from 'react-router-dom';
import { useGetReservationsFromWorkspaceQuery } from '../../api/reservationApiSlice';
import { CircularProgress, Container, Grid, Typography, Box } from '@mui/material';
import { createDate } from '../../utils/helper';
import ActiveReservationCard from '../../components/Reservation/workspaceReservations';
import { useEffect, useState } from 'react';

const WorkspaceReservations = () => {
  const { workspaceId, workspaceName } = useParams();
  const navigate = useNavigate();

  const currentDay = createDate(0);

  const {
    data: [reservations] = [],
    isError,
    error,
    isLoading,
    refetch
  } = useGetReservationsFromWorkspaceQuery({
    from: currentDay,
    until: currentDay,
    workspaceId: workspaceId,
    size: 20
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      refetch();
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (isError) {
      const authorizationError = errorHandler(error);
      if (authorizationError) navigate('/sign-in');
    }
  }, [reservations]);

  const isActiveReservation = (reservation) => {
    const start = new Date(reservation.startAt);
    const end = new Date(reservation.endAt);
    const now = new Date();
    return now > start && now < end;
  };

  // Render loading state
  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Container maxWidth="sm" style={{ padding: 0 }}>
      <Typography variant="h5" gutterBottom sx={{ padding: 2 }}>
        Reservations for {workspaceName}
      </Typography>
      {reservations && reservations.length > 0 ? (
        <>
          <Box spacing={1} direction="row" flexWrap="wrap" margin={0}>
            <Grid
              sx={{
                display: 'grid',
                rowGap: 1,
                columnGap: 1,
                gridTemplateColumns: 'repeat(1, 1fr)',
                paddingBottom: 2
              }}
            >
              {reservations.map((reservation) => (
                <ActiveReservationCard
                  key={reservation.id}
                  reservation={reservation}
                  isActive={isActiveReservation(reservation)}
                />
              ))}
            </Grid>
          </Box>
        </>
      ) : (
        <div>There are no reservations</div>
      )}
    </Container>
  );
};

export default WorkspaceReservations;
