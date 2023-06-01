import { useState, useRef } from 'react';
import { CircularProgress, Typography, Box, Grid, Container } from '@mui/material';
import { useGetWorkspaceSearchListQuery, useGetWorkspacesListQuery } from '../../api/workspaceApiSlice';
import { useNavigate } from 'react-router-dom';
import DefaultTable from '../../components/Backoffice/table';
import DeleteButton from '../../components/Buttons/deleteButton';
import UpdateButton from '../../components/Buttons/updateButton';
import SearchButton from '../../components/Buttons/searchButton';
import SearchField from '../../components/Filters/searchField';

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
    minWidth: 150,
    align: 'left'
  },
  {
    id: 'area',
    label: 'Area',
    minWidth: 150,
    align: 'left'
  },
  {
    id: 'reservations',
    label: 'Reservations',
    minWidth: 170,
    align: 'center'
  }
];

const TabletDashboard = () => {
  const searchRef = useRef();
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [searchData, setSearchData] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    const searchField = new FormData(searchRef.current);
    setSearchTerm(searchField.get('area'));
  };

  const handleSearchTerm = (event) => {
    setSearchData(event.target.value);
  };

  const handleSearchClear = (event) => {
    searchRef.current.reset();
    setSearchTerm('');
    setSearchData('');
  };

  const handleViewButton = (workspace) => {
    navigate(`/workspace/${workspace.id}/${workspace.name}`);
  };

  const handleChangeRowsPerPage = (event) => {
    setSize(+event.target.value);
    setPage(0);
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
    include: ['workspaceType', 'equipment']
  });

  const {
    data: searchWorkspace = [],
    isError: isWorkspaceSearchError,
    isLoading: isWorkspaceSearchLoading
  } = useGetWorkspaceSearchListQuery({
    name: [searchTerm]
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
      reservations: (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <UpdateButton onClick={() => handleViewButton(el)} text={'View'} />
        </div>
      )
    };
  });

  const count = workspacePages * size - 1;

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
              <DeleteButton onClick={handleSearchClear} text={'Clear'} />
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

export default TabletDashboard;
