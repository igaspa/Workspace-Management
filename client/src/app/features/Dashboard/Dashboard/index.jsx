import React from 'react';
import Grid from '@mui/material/Grid';
import { CircularProgress, Typography, Stack, Box } from '@mui/material';
import WorkspaceCard from '../../Workspace/WorkspaceCard';
import WorkspaceTypeCard from '../../../components/WorkspaceType/workspaceTypeCard';
import { DateFilter } from '../../../components/Filters/dateFilter';
import { TimeFilter } from '../../../components/Filters/timeFilter';
import { useGetWorkspacesListQuery } from '../../../api/workspaceApiSlice';
import { useGetWorkspaceTypesListQuery } from '../../../api/workspaceTypeApiSlice';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { deconstructName, getNext7Days, getHours } from '../../../utils/helper';
import { BasicPagination } from '../../../components/Pagination/pagination';
import { errorHandler } from '../../../utils/errors';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

const Dashboard = () => {
	const navigate = useNavigate();
	const [selectedWorkspaceType, setSelectedWorkspaceType] = React.useState(null);
	const [from, setFrom] = React.useState(null);
	const [until, setUntil] = React.useState(null);
	const [date, setDate] = React.useState('');
	const [startHour, setStartHour] = React.useState('');
	const [endHour, setEndHour] = React.useState('');
	const [page, setPage] = React.useState(1);

	const hours = getHours(date);
	const dates = getNext7Days();

	const handlePageChange = async (event, value) => {
		setPage(value);
	};

	// get Workspace Type table name from change
	const handleWorkspaceTypeSelect = (workspaceTypeName) => {
		const newName = deconstructName(workspaceTypeName);
		setSelectedWorkspaceType(newName);
	};

	// get selected date
	const handleDateChange = (event) => {
		setDate(event.target.value);
	};
	// get selected start hour
	const handleStartHourChange = (event) => {
		setStartHour(event.target.value);
	};

	// get selected end hour
	const handleEndHourChange = (event) => {
		setEndHour(event.target.value);
	};

	// set from and until value
	React.useEffect(() => {
		if (date && startHour) setFrom(`${date}T${startHour}`);
		if (date && endHour) setUntil(`${date}T${endHour}`);
	}, [date, startHour, from, endHour, until]);

	// const [workspaceData, setWorkspaceData] = React.useState('');
	// const [workspaceTypeData, setWorkspaceTypeData] = React.useState('');

	const { data: workspaceTypesData = [], isError: workspaceTypesError, error: workspaceTypeErrorObject, isLoading: workspaceTypesLoading } = useGetWorkspaceTypesListQuery();

	// Fetch workspaces data
	const { data: [workspacesData, pages] = [], isError: workspacesError, error: workspacesErrorObject, isLoading: workspacesLoading } = useGetWorkspacesListQuery({
		...(selectedWorkspaceType && { workspace_type: selectedWorkspaceType }),
		...(from && { from }),
		...(until && { until }),
		...(page && { page })
	});

	// React.useEffect(() => {
	// 	setWorkspaceData(workspacesData);
	// 	setWorkspaceTypeData(workspaceTypesData);
	// }, [workspacesData, workspaceTypesData]);

	React.useEffect(() => {
		if (workspaceTypesError || workspacesError) {
			const authorizationError = errorHandler(workspaceTypeErrorObject) || errorHandler(workspacesErrorObject);
			if (authorizationError) navigate('/sign-in');
		}
	}, [workspaceTypesData, workspacesData]);

	// Render loading state
	if (workspacesLoading || workspaceTypesLoading) {
		return <CircularProgress />;
	}

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<main>
				<Box spacing={2} direction="row" flexWrap="wrap" margin={0}>
					<Container maxWidth="sm">
						<Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>Find a Space
						</Typography>
					</Container>
					<Stack sx={{ pt: 1 }} direction="row" spacing={2} justifyContent="center">
						{workspaceTypesData.map((workspaceType) => (
							<WorkspaceTypeCard key={workspaceType.id} workspaceType={workspaceType} handleWorkspaceTypeSelect={() => {
								setPage(1);
								handleWorkspaceTypeSelect(workspaceType.name);
							}} />
						))}
					</Stack>
					<Container maxWidth="sm">
						<div style={{ display: 'flex', alignItems: 'center', paddingTop: 20, paddingBottom: 2 }}>
							<Typography align="center" color="text.primary" sx={{ paddingRight: 1, fontSize: 15 }}> Select a date: </Typography>
							<DateFilter onChange={(event) => {
								setPage(1);
								handleDateChange(event);
							}} date={date} dates={dates} />
							<Typography align="center" color="text.primary" sx={{ paddingRight: 1, paddingLeft: 1, fontSize: 15 }}> from: </Typography>
							<TimeFilter onChange={(event) => {
								setPage(1);
								handleStartHourChange(event);
							}} hour={startHour} hours={hours}/>
							<Typography align="center" color="text.primary" sx={{ paddingRight: 1, paddingLeft: 1, fontSize: 15 }}> until: </Typography>
							<TimeFilter onChange={(event) => {
								setPage(1);
								handleEndHourChange(event);
							}} hour={endHour} hours={hours}/>
						</div>
					</Container>
					<Container maxWidth="lg" sx={{ paddingTop: 2, paddingBottom: 2 }}>
						<Grid container sx={{ display: 'grid', rowGap: 1, columnGap: 1, gridTemplateColumns: 'repeat(5, 1fr)' }}>
							{workspacesData
								.map((workspace) => {
									return <WorkspaceCard key={workspace.id} workspace={workspace} date={date} startHour={startHour} endHour={endHour}/>;
								})}
						</Grid>
					</Container>
					<BasicPagination count={pages} page={page} onChange={handlePageChange}/>
				</Box>
			</main>
		</ThemeProvider>
	);
};

export default Dashboard;
