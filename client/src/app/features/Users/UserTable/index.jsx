import { useState, useRef } from 'react';
import {
  CircularProgress,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  useMediaQuery,
  Grid,
  Container
} from '@mui/material';
import { successToast } from '../../../utils/toastifyNotification';
import { useNavigate } from 'react-router-dom';
import { errorHandler } from '../../../utils/errors';
import UserForm from '../../../components/Users/updateUserForm';
import { useTheme } from '@mui/material/styles';
import DefaultTable from '../../../components/Backoffice/table';
import Prompt from '../../../components/Dialogs/dialog';
import CreateButton from '../../../components/Buttons/createButton';
import UpdateButton from '../../../components/Buttons/updateButton';
import SearchButton from '../../../components/Buttons/searchButton';
import SearchField from '../../../components/Filters/searchField';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import styles from '../../../CSS/Button.Module.css';
import {
  useDeleteUserMutation,
  useGetUsersListQuery,
  useGetUsersSearchListQuery,
  useUpdateUserMutation
} from '../../../api/usersApiSlice';

const columns = [
  {
    id: 'firstName',
    label: 'First Name',
    minWidth: 170,
    align: 'left'
  },
  {
    id: 'lastName',
    label: 'Last Name',
    minWidth: 130,
    align: 'left'
  },
  {
    id: 'email',
    label: 'Email',
    minWidth: 140,
    align: 'left'
  },
  {
    id: 'phoneNumber',
    label: 'Phone Number',
    minWidth: 100,
    align: 'left'
  },
  {
    id: 'actions',
    label: 'Actions',
    minWidth: 170,
    align: 'center'
  }
];

const Users = () => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const [open, setOpen] = useState(false);

  const [selectedId, setSelectedId] = useState();
  const [selectedUser, setSelectedWorkspace] = useState(null);

  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const searchRef = useRef();

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [searchData, setSearchData] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleCreateUserButton = () => {
    navigate('/backoffice/user/invite');
  };

  const handleReinviteUserButton = () => {
    navigate('/backoffice/user/reinvite');
  };

  const handleDeleteButton = (userId) => {
    setSelectedId(userId);
    setOpen(true);
  };

  const handleSearch = () => {
    const searchField = new FormData(searchRef.current);
    setSearchTerm(searchField.get('user'));
    setPage(0);
  };

  const handleSearchTerm = (event) => {
    setSearchData(event.target.value);
  };

  const handleSearchClear = () => {
    searchRef.current.reset();
    setSearchTerm('');
    setSearchData('');
  };

  const handleUpdateButton = (user) => {
    setSelectedWorkspace(user);
    setSelectedId(user.id);
    setShowUpdateForm(true);
  };

  const handleChangeRowsPerPage = (event) => {
    setSize(+event.target.value);
    setPage(0);
  };

  const handleUpdateUser = async (formObject) => {
    if (!Object.keys(formObject).length) {
      successToast('No changes made!');
      setShowUpdateForm(false);
      setSelectedId('');
    } else {
      await updateUser({ id: selectedId, body: formObject })
        .unwrap()
        .then((response) => {
          successToast(response.message);
          setShowUpdateForm(false);
          setSelectedId('');
        })
        .catch((error) => {
          const authorizationError = errorHandler(error);
          if (authorizationError) navigate('/sign-in');
        });
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenForceDelete = () => {
    setOpenForceDelete(true);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const {
    data: [users, userPages] = [],
    isError: isUserError,
    isLoading: isUsersLoading
  } = useGetUsersListQuery({
    ...(page && { page: page + 1 }),
    ...(size && { size })
  });

  const {
    data: [searchUser, searchUserPages] = [],
    isError: isUserSearcherror,
    isLoading: isUserSearchLoading
  } = useGetUsersSearchListQuery({
    email: [searchTerm],
    ...(page && { page: page + 1 }),
    ...(size && { size })
  });

  const filteredData =
    searchTerm?.length >= 3
      ? searchUser.filter((item) => item.email.toLowerCase().includes(searchTerm.toLowerCase()))
      : users;

  const data = filteredData?.map((el) => {
    return {
      id: el.id,
      firstName: el.firstName,
      lastName: el.lastName,
      email: el.email,
      phoneNumber: el.phoneNumber,
      actions: (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <EditIcon className={styles.editIcon} onClick={() => handleUpdateButton(el)}></EditIcon>
          <DeleteIcon className={styles.deleteIcon} onClick={() => handleDeleteButton(el.id)}></DeleteIcon>
        </div>
      )
    };
  });

  const count = searchUserPages ? searchUserPages * size : userPages * size;

  const handleDeleteClick = async (event) => {
    event.preventDefault();
    await deleteUser({ id: selectedId })
      .unwrap()
      .then((response) => {
        handleClose();
        successToast(response.message);
      })
      .catch((error) => {
        if (error.status === 400) {
          handleClose();
          handleOpenForceDelete();
        } else errorHandler(error);
      });
  };

  return (
    <Container maxWidth="lg">
      {isUsersLoading || isUserSearchLoading ? (
        <CircularProgress />
      ) : isUserError || isUserSearcherror ? (
        <Typography color="error">Failed to load users.</Typography>
      ) : (
        <main>
          <Box spacing={2} direction="row" flexWrap="wrap" margin={0} padding={0}>
            <Grid component="form" ref={searchRef} container alignItems="center" paddingBottom={1}>
              <SearchField data={searchUser.map((item) => item.name)} name="user" onChange={handleSearchTerm} />
              <SearchButton onClick={handleSearch} text={'Search'} disabled={searchData?.length < 3} />
              <UpdateButton onClick={handleSearchClear} text={'Clear'} />
              <CreateButton onClick={handleCreateUserButton} text={'Add User'} />
              <CreateButton onClick={handleReinviteUserButton} text={'Reinvite User'} />
            </Grid>
            <Box spacing={1} direction="row" flexWrap="wrap" margin={0}>
              {users.length ? (
                <>
                  <DefaultTable
                    columns={columns}
                    rows={data}
                    page={page}
                    count={count}
                    rowsPerPage={size}
                    handleChangePage={handlePageChange}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                    rowsPerPageOptions={[10, 25, 50, 100]}
                  />

                  <Prompt
                    open={open}
                    onClose={handleClose}
                    title={'Delete User'}
                    body={'Are you sure you want to delete this user?'}
                    handleCancel={handleClose}
                    handleConfirm={handleDeleteClick}
                  />

                  {showUpdateForm && (
                    <Dialog open={showUpdateForm} fullScreen={fullScreen} onClose={() => setShowUpdateForm(false)}>
                      <DialogTitle>Update User</DialogTitle>
                      <DialogContent>
                        <UserForm
                          user={selectedUser}
                          onSave={handleUpdateUser}
                          onCancel={() => setShowUpdateForm(false)}
                        />
                      </DialogContent>
                    </Dialog>
                  )}
                </>
              ) : (
                'There are no users...'
              )}
            </Box>
          </Box>
        </main>
      )}
    </Container>
  );
};

export default Users;
