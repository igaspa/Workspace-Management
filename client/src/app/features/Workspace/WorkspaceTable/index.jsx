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
import {
  useDeleteWorkspaceMutation,
  useGetWorkspaceSearchListQuery,
  useGetWorkspacesListQuery,
  useUpdateWorkspaceMutation
} from '../../../api/workspaceApiSlice';
import { useNavigate } from 'react-router-dom';
import { errorHandler } from '../../../utils/errors';
import WorkspaceForm from '../../../components/Workspace/updateWorkspaceForm';
import { useTheme } from '@mui/material/styles';
import DefaultTable from '../../../components/Backoffice/table';
import Prompt from '../../../components/Dialogs/dialog';
import CreateButton from '../../../components/Buttons/createButton';
import UpdateButton from '../../../components/Buttons/updateButton';
import SearchButton from '../../../components/Buttons/searchButton';
import SearchField from '../../../components/Filters/searchField';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import styles from '../../../CSS/Button.Module.css'

const columns = [
  {
    id: 'name',
    label: 'Name',
    minWidth: 170,
    align: 'left'
  },
  {
    id: 'type',
    label: 'Type',
    minWidth: 130,
    align: 'left'
  },
  {
    id: 'area',
    label: 'Area',
    minWidth: 140,
    align: 'left'
  },
  {
    id: 'permanentlyReserved',
    label: 'Permanently Reserved',
    minWidth: 100,
    align: 'left'
  },
  {
    id: 'equipment',
    label: 'Equipment',
    minWidth: 170,
    align: 'left'
  },
  {
    id: 'actions',
    label: 'Actions',
    minWidth: 170,
    align: 'center'
  }
];

const Workspaces = () => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const [deleteWorkspace] = useDeleteWorkspaceMutation();
  const [updateWorkspace] = useUpdateWorkspaceMutation();

  const [open, setOpen] = useState(false);
  const [openForceDelete, setOpenForceDelete] = useState(false);

  const [selectedId, setSelectedId] = useState();
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);

  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const searchRef = useRef();

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [searchData, setSearchData] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleCreateWorkspaceButton = () => {
    navigate('/backoffice/create-workspace');
  };

  const handleDeleteButton = (workspaceId) => {
    setSelectedId(workspaceId);
    setOpen(true);
  };

  const handleSearch = () => {
    const searchField = new FormData(searchRef.current);
    setSearchTerm(searchField.get('area'));
  };

  const handleSearchTerm = (event) => {
    setSearchData(event.target.value);
    setPage(0)
  };

  const handleSearchClear = () => {
    searchRef.current.reset();
    setSearchTerm('');
    setSearchData('');
  };

  const handleUpdateButton = (workspace) => {
    setSelectedWorkspace(workspace);
    setSelectedId(workspace.id);
    setShowUpdateForm(true);
  };

  const handleChangeRowsPerPage = (event) => {
    setSize(+event.target.value);
    setPage(0);
  };

  const handleUpdateWorkspace = async (formObject) => {
    if (!Object.keys(formObject).length) {
      successToast('No changes made!');
      setShowUpdateForm(false);
      setSelectedId('');
    } else {
      await updateWorkspace({ id: selectedId, body: formObject })
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

  const handleCloseForceDelete = () => {
    setOpenForceDelete(false);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const {
    data: [workspaces, workspacePages] = [],
    isError: isWorkspacesError,
    isLoading: isWorkspacesLoading
  } = useGetWorkspacesListQuery({
    ...(page && { page: page + 1 }),
    ...(size && { size }),
    include: ['workspaceType']
  });

  const {
    data: [searchWorkspace, searchWorkspacePages] = [],
    isError: isWorkspaceSearchError,
    isLoading: isWorkspaceSearchLoading
  } = useGetWorkspaceSearchListQuery({
    name: [searchTerm],
    ...(page && { page: page + 1 }),
    ...(size && { size })
  });

  const filteredData =
    searchTerm.length >= 3
      ? searchWorkspace.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
      : workspaces;

  const data = filteredData?.map((el) => {
    return {
      id: el.id,
      name: el.name,
      type: el.workspaceType.name,
      area: el.area.name,
      permanentlyReserved: el.permanentlyReserved.toString(),
      equipment: el.equipment.length
        ? el.equipment.map((eq) => (
            <div key={eq.id}>
              {eq.name} - Qty: {eq.workspaceEquipment.quantity}
            </div>
          ))
        : '/',
      actions: (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <EditIcon className={styles.editIcon} onClick={() => handleUpdateButton(el)}></EditIcon>
			    <DeleteIcon className={styles.deleteIcon} onClick={() => handleDeleteButton(el.id)} ></DeleteIcon>
        </div>
      )
    };
  });

  const count = searchWorkspacePages ? searchWorkspacePages * size : workspacePages * size;
  
  const handleDeleteClick = async (event) => {
    event.preventDefault();
    await deleteWorkspace({ id: selectedId })
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

  const handleForceDeleteClick = async (event) => {
    event.preventDefault();
    await deleteWorkspace({ id: selectedId, forceDelete: true })
      .unwrap()
      .then((response) => {
        handleCloseForceDelete();
        successToast(response.message);
      })
      .catch((error) => {
        handleCloseForceDelete();
        errorHandler(error);
      });
  };

  return (
    <Container maxWidth="lg">
      {isWorkspacesLoading || isWorkspaceSearchLoading ? (
        <CircularProgress />
      ) : isWorkspacesError || isWorkspaceSearchError ? (
        <Typography color="error">Failed to load workspaces.</Typography>
      ) : (
        <main>
          <Box spacing={2} direction="row" flexWrap="wrap" margin={0} padding={0}>
            <Grid component="form" ref={searchRef} container alignItems="center" paddingBottom={1}>
              <SearchField data={searchWorkspace.map((item) => item.name)} name="area" onChange={handleSearchTerm} />
              <SearchButton onClick={handleSearch} text={'Search'} disabled={searchData?.length < 3} />
              <UpdateButton onClick={handleSearchClear} text={'Clear'} />
              <CreateButton onClick={handleCreateWorkspaceButton} text={'Create Workspaces'} />
            </Grid>
            <Box spacing={1} direction="row" flexWrap="wrap" margin={0}>
              {workspaces.length ? (
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
                    title={'Delete Workspace'}
                    body={'Are you sure you want to delete this workspace?'}
                    handleCancel={handleClose}
                    handleConfirm={handleDeleteClick}
                  />

                  <Prompt
                    open={openForceDelete}
                    onClose={handleClose}
                    title={'Force Delete Workspace'}
                    body={
                      'There are active reservations for this workspace, if you wish to proceed click "FORCE DELETE"'
                    }
                    handleConfirm={handleForceDeleteClick}
                    handleCancel={handleCloseForceDelete}
                  />

                  {showUpdateForm && (
                    <Dialog open={showUpdateForm} fullScreen={fullScreen} onClose={() => setShowUpdateForm(false)}>
                      <DialogTitle>Update Workspace</DialogTitle>
                      <DialogContent>
                        <WorkspaceForm
                          workspace={selectedWorkspace}
                          onSave={handleUpdateWorkspace}
                          onCancel={() => setShowUpdateForm(false)}
                        />
                      </DialogContent>
                    </Dialog>
                  )}
                </>
              ) : (
                'There are no workspaces...'
              )}
            </Box>
          </Box>
        </main>
      )}
    </Container>
  );
};

export default Workspaces;
