import { useState, useEffect } from 'react';
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
import { deconstructName, getNext7Days, getHours, createDate } from '../../../utils/helper';
import { BasicPagination } from '../../../components/Pagination/pagination';
import { errorHandler } from '../../../utils/errors';
import { useNavigate } from 'react-router-dom';
import { useGetAreaListQuery } from '../../../api/areaApiSlice';
import AreaFilter from '../../../components/Filters/areaFilter';

const theme = createTheme();

const Dashboard = () => {
	const currentDay = createDate(0);

	const navigate = useNavigate();
	const [selectedWorkspaceType, setSelectedWorkspaceType] = useState(null);
	const [from, setFrom] = useState();
	const [until, setUntil] = useState();
	const [fromDate, setFromDate] = useState(currentDay);
	const [untilDate, setUntilDate] = useState(currentDay);
	const role = localStorage.getItem('role');

	const [startHour, setStartHour] = useState('');
	const [endHour, setEndHour] = useState('');
	const [page, setPage] = useState(1);
	const [selectedArea, setSelectedArea] = useState('');
	const [areaParams, setAreaParams] = useState('');

	const dates = getNext7Days();

	const startHours = getHours(fromDate);
	const endHours = getHours(untilDate || fromDate);

	const handlePageChange = async (event, value) => {
		setPage(value);
	};

	// get Workspace Type table name from change
	const handleWorkspaceTypeSelect = (workspaceTypeName) => {
		const newName = deconstructName(workspaceTypeName);
		setSelectedWorkspaceType(newName);
	};

	const handleAreaSelect = (event) => {
		setSelectedArea(event.target.value);
		const params = deconstructName(event.target.value);
		if (event.target.value === 'All') {
			setAreaParams('');
		} else { setAreaParams(params); }
	};

	const handleFromDateChange = (event) => {
		setFromDate(event.target.value);
		if (!untilDate)setUntilDate(event.target.value);
		if (new Date(event.target.value) > new Date(untilDate)) setUntilDate(event.target.value);
	};

	const handleUntilDateChange = (event) => {
		setUntilDate(event.target.value);
		if (!fromDate)setFromDate(event.target.value);
		if (new Date(event.target.value) < new Date(fromDate)) setFromDate(event.target.value);
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
	useEffect(() => {
		if (fromDate && startHour) setFrom(`${fromDate}T${startHour}`);
		if ((fromDate || untilDate) && endHour) setUntil(`${untilDate || fromDate}T${endHour}`);
	}, [fromDate, untilDate, startHour, endHour, from, until]);

	const { data: [workspaceTypesData] = [], isError: workspaceTypesError, error: workspaceTypeErrorObject, isLoading: workspaceTypesLoading } = useGetWorkspaceTypesListQuery();
	const { data: [areaData] = [], isError: areaError, error: areaErrorObject, isLoading: areaLoading } = useGetAreaListQuery();

	// Fetch workspaces data
	const { data: [workspacesData, pages] = [], isError: workspacesError, error: workspacesErrorObject, isLoading: workspacesLoading } = useGetWorkspacesListQuery({
		...(selectedWorkspaceType && { workspace_type: selectedWorkspaceType }),
		...(selectedArea && { area_name: areaParams }),
		...(from && { from }),
		...(until && { until }),
		...(page && { page }),
		include: ['workspaceType'],
		status: 'available'
	});

	const createAreaOptions = () => {
		const areaNames = areaData?.map(el => el.name);
		areaNames.push('All');
		return areaNames;
	};

	useEffect(() => {
		if (workspaceTypesError) {
			const authorizationError = errorHandler(workspaceTypeErrorObject);
			if (authorizationError) navigate('/sign-in');
		} else if (workspacesError) {
			const authorizationError = errorHandler(workspacesErrorObject);
			if (authorizationError) navigate('/sign-in');
		} else if (areaError) {
			const authorizationError = errorHandler(areaErrorObject);
			if (authorizationError) navigate('/sign-in');
		}
	}, [workspaceTypeErrorObject, workspacesErrorObject, areaErrorObject]);

	// Render loading state
	if (workspacesLoading || workspaceTypesLoading || areaLoading) {
		return <CircularProgress />;
	}

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<main>
				{workspaceTypesData?.length
					? <Box spacing={2} direction="row" flexWrap="wrap" margin={0}>
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
						{workspacesData.length
							? <BasicPagination count={pages} page={page} onChange={handlePageChange} />
							: null}
						<div style={{ display: 'flex', paddingTop: 20, justifyContent: 'center' }}>
							<div style={{ display: 'flex', alignItems: 'center' }}>
								<Typography align="center" color="text.primary" sx={{ paddingRight: 2, fontSize: 14 }}> From: </Typography>
								<DateFilter onChange={(event) => {
									setPage(1);
									handleFromDateChange(event);
								}} date={fromDate} dates={dates} />

								{ (role.includes('Administrator') || role.includes('Lead')) &&
							<>
								<Typography align="center" color="text.primary" sx={{ paddingLeft: 1, paddingRight: 1, fontSize: 14 }}> Until: </Typography>
								<DateFilter onChange={(event) => {
									setPage(1);
									handleUntilDateChange(event);
								}} date={untilDate} dates={dates} />
							</>
								}
								<Typography align="center" color="text.primary" sx={{ paddingRight: 1, paddingLeft: 1, fontSize: 14 }}> Time start: </Typography>
								<TimeFilter onChange={(event) => {
									setPage(1);
									handleStartHourChange(event);
								}} hour={startHour} hours={startHours}/>
								<Typography align="center" color="text.primary" sx={{ paddingRight: 1, paddingLeft: 1, fontSize: 14 }}> Time end: </Typography>
								<TimeFilter onChange={(event) => {
									setPage(1);
									handleEndHourChange(event);
								}} hour={endHour} hours={endHours}/>
							</div>
							<div>
								<AreaFilter names={createAreaOptions()} handleAreaSelect={handleAreaSelect} areaName={selectedArea}/>
							</div>
						</div>
						<Container maxWidth="lg" sx={{ paddingTop: 2, paddingBottom: 2 }}>
							<Grid container sx={{ display: 'grid', rowGap: 1, columnGap: 1, gridTemplateColumns: 'repeat(5, 1fr)' }}>
								{workspacesData
									.map((workspace) => {
										return <WorkspaceCard key={workspace.id} image={workspace.workspaceType.image} workspace={workspace} fromDate={fromDate} untilDate={untilDate} startHour={startHour} endHour={endHour}/>;
									})}
							</Grid>
						</Container>
						{workspacesData.length
							? <Box display="flex" justifyContent="flex-end">
								<BasicPagination count={pages} page={page} onChange={handlePageChange} />
							</Box>
							: null}

					</Box>
					:				'Something went wrong...'
				}
			</main>
		</ThemeProvider>
	);
};

export default Dashboard;
