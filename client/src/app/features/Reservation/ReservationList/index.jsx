import { useState } from 'react';
import { useDeleteReservationMutation, useGetUsersReservationListQuery } from '../../../api/reservationApiSlice';
import { CircularProgress, Typography, Grid, Box, useMediaQuery, CssBaseline } from '@mui/material';
import ReservationCard from '../../../components/Reservation/reservationCard';
import UpdateReservation from '../UpdateReservation';
import Drawer from '@mui/material/Drawer';
import { successToast, errorToast } from '../../../utils/toastifyNotification';
import { BasicPagination } from '../../../components/Pagination/pagination';
import { DateTime } from 'luxon';
import { useTheme } from '@emotion/react';
import { Container } from '@mui/system';

const Reservations = () => {
  const [deleteReservation] = useDeleteReservationMutation();
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedReservation, setSelectedReservation] = useState({});

  const [fromDate, setFromDate] = useState('');
  const [untilDate, setUntilDate] = useState('');

  const [startHour, setStartHour] = useState('');
  const [endHour, setEndHour] = useState('');

  const handleDrawerOpen = (_event, reservation) => {
    setSelectedReservation(reservation);

    const startDate = DateTime.fromISO(reservation.startAt, { zone: 'local' });
    const endDate = DateTime.fromISO(reservation.endAt, { zone: 'local' });

    setFromDate(startDate.toISO().slice(0, 10));
    setUntilDate(endDate.toISO().slice(0, 10));

    setStartHour(startDate.toISO().slice(11, 16));
    setEndHour(endDate.toISO().slice(11, 16));

    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setSelectedReservation({});
  };

  const handlePageChange = async (event, value) => {
    setPage(value);
  };

  const handleDeleteClick = async (event, reservation) => {
    event.preventDefault();
    await deleteReservation(reservation.id)
      .unwrap()
      .then((response) => {
        successToast(response.message);
      })
      .catch((error) => {
        errorToast(error.data.details);
      });
  };

  const { data: [reservationData, pages] = [], isError, isLoading } = useGetUsersReservationListQuery();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container maxWidth="lg">
      <CssBaseline />
      <main>
        {isLoading ? (
          <CircularProgress />
        ) : isError ? (
          <Typography color="error">Failed to load reservations.</Typography>
        ) : (
          <>
            {reservationData.length ? (
              <>
                <h2>Reservation List</h2>
                <Box display="flex" justifyContent="flex-end">
                  <BasicPagination count={pages} page={page} onChange={handlePageChange} />
                </Box>
                <Grid container spacing={2} sx={{ pt: 1 }} direction="row" justifyContent="left">
                  {reservationData.map((reservation) => (
                    <Grid
                      item
                      xs={6}
                      sm={6}
                      md={4}
                      lg={3}
                      xl={3}
                      key={reservation.id}
                      sx={{ display: 'flex', flexDirection: 'column' }}
                    >
                      <ReservationCard
                        key={reservation.id}
                        reservation={reservation}
                        handleUpdateClick={(event) => handleDrawerOpen(event, reservation)}
                        handleDeleteClick={(event) => handleDeleteClick(event, reservation)}
                      />
                    </Grid>
                  ))}
                </Grid>
              </>
            ) : (
              "You don't have any reservations."
            )}
            <Drawer
              anchor="right"
              open={open}
              onClose={handleDrawerClose}
              PaperProps={{
                sx: {
                  maxWidth: isMobile ? '90%' : '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }
              }}
            >
              <UpdateReservation
                startDate={fromDate}
                endDate={untilDate}
                startHour={startHour}
                endHour={endHour}
                reservation={selectedReservation}
                onClose={handleDrawerClose}
              />
            </Drawer>
          </>
        )}
      </main>
    </Container>
  );
};

export default Reservations;
