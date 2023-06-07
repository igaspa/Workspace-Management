import { CircularProgress, Container, Typography } from '@mui/material';
import { useGetReservationsListQuery, useDeleteReservationMutation } from '../../../api/reservationApiSlice';
import { useNavigate } from 'react-router-dom';
import DeleteButton from '../../../components/Buttons/deleteButton';
import { successToast, errorToast } from '../../../utils/toastifyNotification';
import DefaultTable from '../../../components/Backoffice/table';
import { useState } from 'react';
import Prompt from '../../../components/Dialogs/dialog';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from '../../../CSS/Button.Module.css';

const columns = [
  {
    id: 'user',
    label: 'User',
    minWidth: 170,
    align: 'left'
  },
  {
    id: 'workspace',
    label: 'Workspace',
    minWidth: 170,
    align: 'left'
  },
  {
    id: 'dateTime',
    label: 'Duration',
    minWidth: 170,
    align: 'left'
  },
  {
    id: 'actions',
    label: 'Action',
    minWidth: 170,
    align: 'center'
  }
];

export default function ReservationTable() {
  const [deleteReservation] = useDeleteReservationMutation();
  const role = localStorage.getItem('role');
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [selectedId, setSelectedId] = useState('');
  const [openDelete, setOpenDelete] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setSize(+event.target.value);
    setPage(0);
  };

  const handleClickOpenDelete = (event, reservationId) => {
    setSelectedId(reservationId);
    setOpenDelete(true);
  };

  const handleClose = () => {
    setOpenDelete(false);
  };

  const {
    data: [reservationData, pages] = [],
    isError,
    isLoading
  } = useGetReservationsListQuery({
    ...(page && { page: page + 1 }),
    ...(size && { size })
  });

  const handleDeleteClick = async (event) => {
    event.preventDefault();
    await deleteReservation(selectedId)
      .unwrap()
      .then((response) => {
        successToast(response.message);
        setOpenDelete(false);
      })
      .catch((error) => {
        errorToast(error.data.details);
      });
  };
  const count = pages * size;
  const data = reservationData?.map((el) => ({
    id: el.id,
    user: `${el.user.firstName} ${el.user.lastName}`,
    workspace: el.workspace.name,
    dateTime: el.dateTime,
    actions: (
      <div style={{ display: 'flex', flexDirection: 'row', padding: 1, justifyContent: 'center' }}>
        <DeleteIcon className={styles.deleteIcon} onClick={() => handleClickOpenDelete(event, el.id)}></DeleteIcon>
      </div>
    )
  }));
  return (
    <Container maxWidth="lg">
      {role.includes('Administrator') ? (
        isLoading ? (
          <CircularProgress />
        ) : isError ? (
          <Typography color="error">Failed to load reservations.</Typography>
        ) : data.length ? (
          <>
            <DefaultTable
              columns={columns}
              rows={data}
              page={page}
              count={count}
              rowsPerPage={size}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
              rowsPerPageOptions={[10, 25, 50, 100]}
            />
            <Prompt
              open={openDelete}
              onClose={handleClose}
              title={'Delete Reservation'}
              body={'Are you sure you want to delete this reservation?'}
              handleCancel={handleClose}
              handleConfirm={handleDeleteClick}
            />
          </>
        ) : (
          'There are no reservations'
        )
      ) : (
        navigate('/')
      )}
    </Container>
  );
}
